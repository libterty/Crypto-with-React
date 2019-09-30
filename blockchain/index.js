const Block = require('./block');
const Transaction = require('../wallet/transaction');
const Wallet = require('../wallet');
const { cryptoHash } = require('../util');
const { REWARD_INPUT, MINING_REWARD } = require('../config');

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock({ data }) {
    const newBlock = Block.mineBlock({
      lastBlock: this.chain[this.chain.length - 1],
      data
    });

    this.chain.push(newBlock);
  }

  replaceChain(chain, validateTransactions, onSuccess) {
    if (chain.length <= this.chain.length) {
      console.error('The incoming chain must be longer');
      return;
    }

    if (!Blockchain.isValidChain(chain)) {
      console.error('The incoming chain must be valid');
      return;
    }

    if (validateTransactions && !this.validTransactionData({ chain })) {
      console.error('The incoming chain has invalid data');
      return;
    }

    if (onSuccess) onSuccess();
    console.log('replacing chain with', chain);
    this.chain = chain;
  }

  validTransactionData({ chain }) {
    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const transactionSet = new Set();
      let rewardTransactionCount = 0;

      for (const transaction of block.data) {
        if (transaction.input.address === REWARD_INPUT.address) {
          rewardTransactionCount += 1;
          // and the transaction data has multiple rewards
          if (rewardTransactionCount > 1) {
            console.error('Miner rewards exceed limit');
            return false;
          }
          // and the transaction is a reward transaction
          if (Object.values(transaction.outputMap)[0] !== MINING_REWARD) {
            console.log('OutputKey', Object.values(transaction.outputMap)[0]);
            console.error('Miner reward amount is invalid');
            return false;
          }
        } else {
          // and the transaction data has at least one malformed outputMap
          if (!Transaction.validTransaction(transaction)) {
            console.error('Invalid transaction');
            return false;
          }

          const trueBalance = Wallet.calculateBalance({
            // passing the actual chain instead of mal-chain
            chain: this.chain,
            address: transaction.input.address
          });

          // and the transaction data has at least one malformed input
          if (transaction.input.amount !== trueBalance) {
            console.error('Invalid input amount');
            return false;
          }

          // and a block contains multiple identical transactions
          if (transactionSet.has(transaction)) {
            console.error(
              'An identical transaction appears more than once in the block'
            );
            return false;
          }
          transactionSet.add(transaction);
        }
      }
    }

    return true;
  }

  static isValidChain(chain) {
    // ensure eq of genesis block
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }

    for (let i = 1; i < chain.length; i++) {
      const { timestamp, lastHash, hash, nonce, difficulty, data } = chain[i];
      const actualLastHash = chain[i - 1].hash;
      const lastDifficulty = chain[i - 1].difficulty;

      // ensure each block's lastHash eq last block's hash
      if (lastHash !== actualLastHash) return false;

      const validatedHash = cryptoHash(
        timestamp,
        lastHash,
        data,
        nonce,
        difficulty
      );
      // ensure cryptoHash() output eq to hash itself
      if (hash !== validatedHash) return false;
      // ensure the prevention of the difficulty jump
      if (Math.abs(lastDifficulty - difficulty) > 1) return false;
    }

    return true;
  }
}

module.exports = Blockchain;
