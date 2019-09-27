const Block = require('./block')
const cryptoHash = require('./crypto-hash')

class BlockChain {
  constructor() {
    // chain start with genesis data
    this.chain = [Block.genesis()]
  }

  addBlock({ data }) {
    const newBlock = Block.mineBlock({
      // start with genesis data
      lastBlock: this.chain[this.chain.length - 1],
      data
    })
    // console.log(this.chain[this.chain.length - 1])
    // console.log(newBlock)
    this.chain.push(newBlock)
  }

  replaceChain(chain) {
    if (chain.length <= this.chain.length) {
      console.error('The incoming chain must be longer', this.chain)
      return
    }
    if (!BlockChain.isValidChain(chain)) {
      console.error('The incoming chain must be valid', chain)
      return
    }
    console.log('replacing chain with', chain)
    this.chain = chain
  }

  static isValidChain(chain) {
    // ensure eq of genesis block
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false
    }

    for (let i = 1; i < chain.length; i++) {
      const { timestamp, lastHash, hash, data } = chain[i]
      const actualLastHash = chain[i - 1].hash

      // ensure each block's lastHash eq last block's hash
      if (lastHash !== actualLastHash) {
        return false
      }

      // ensure cryptoHash() output eq to hash itself
      const validateHash = cryptoHash(timestamp, lastHash, data)
      if (hash !== validateHash) {
        return false
      }
    }
    return true
  }
}

module.exports = BlockChain
