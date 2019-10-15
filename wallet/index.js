const Transaction = require('./transaction');
const { STARTING_BALANCE } = require('../config');
const { ec, cryptoHash } = require('../util/index');

class Wallet {
  constructor() {
    this.balance = STARTING_BALANCE;
    this.keyPair = ec.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex');
  }

  // each signature has to verify first in order to grant the right address has been sent
  sign(data) {
    return this.keyPair.sign(cryptoHash(data));
  }

  // each transaction amount cannot exceed itself balance
  createTransaction({ recipient, amount, chain }) {
    if (chain) {
      this.balance = Wallet.calculateBalance({
        chain,
        address: this.publicKey
      });
    }

    if (amount > this.balance) {
      throw new Error(`Amount exceeds balance`);
    }

    return new Transaction({ senderWallet: this, recipient, amount });
  }

  // ensure the atomicity of each transaction
  static calculateBalance({ chain, address }) {
    let hashCounductedTransaction = false;
    let outputsTotal = 0;
    for (let i = chain.length - 1; i > 0; i--) {
      const block = chain[i];

      for (const transaction of block.data) {
        if (transaction.input.address === address) {
          hashCounductedTransaction = true;
        }
        const addressOutput = transaction.outputMap[address];

        if (addressOutput) {
          outputsTotal += addressOutput;
        }
      }
      if (hashCounductedTransaction) {
        break;
      }
    }

    return hashCounductedTransaction
      ? outputsTotal
      : STARTING_BALANCE + outputsTotal;
  }
}

module.exports = Wallet;
