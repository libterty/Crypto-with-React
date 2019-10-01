const redis = require('redis');

const CHANNELS = {
  TEST: 'TEST',
  BLOCKCHAIN: 'BLOCKCHAIN',
  TRNASACTION: 'TRNASACTION'
};

class PubSub {
  constructor({ blockchain, transactionPool, redisUrl }) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.publisher = redis.createClient(redisUrl);
    this.subscriber = redis.createClient(redisUrl);

    this.subscribeToChannels();

    this.subscriber.on('message', (channel, message) =>
      this.handleMessage(channel, message)
    );
  }

  handleMessage(channel, message) {
    console.log(`Message received. Channel:${channel}. Message:${message}`);
    const parsedMessage = JSON.parse(message);

    switch (channel) {
      case CHANNELS.BLOCKCHAIN:
        this.blockchain.replaceChain(parsedMessage, true, () => {
          this.transactionPool.clearBlockchainTransactions({
            chain: parsedMessage
          });
        });
        break;
      case CHANNELS.TRNASACTION:
        this.transactionPool.setTransaction(parsedMessage);
        break;
      default:
    }
  }

  subscribeToChannels() {
    Object.values(CHANNELS).forEach(channel => {
      this.subscriber.subscribe(channel);
    });
  }

  publish({ channel, message }) {
    // To ensure subscribe msg to not send unnecessary subscriber
    this.subscriber.unsubscribe(channel, () => {
      this.publisher.publish(channel, message, () => {
        this.subscriber.subscribe(channel);
      });
    });
  }

  broadcastChain() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain)
    });
  }

  broadcastTransaction(transaction) {
    this.publish({
      channel: CHANNELS.TRNASACTION,
      message: JSON.stringify(transaction)
    });
  }
}

module.exports = PubSub;
