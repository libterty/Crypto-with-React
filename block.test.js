const Block = require('./block')
const { GENSIS_DATA } = require('./config')
const cryptoHash = require('./crypto-hash')

describe('Block', () => {
  const timestamp = 'a-data'
  const lastHash = 'foo-hash'
  const hash = 'bar-hash'
  const data = ['blockchian', 'data']
  const block = new Block({ timestamp, lastHash, hash, data })

  it('has all param exist', () => {
    expect(block.timestamp).toEqual(timestamp)
    expect(block.lastHash).toEqual(lastHash)
    expect(block.hash).toEqual(hash)
    expect(block.data).toEqual(data)
  })

  describe('genesis()', () => {
    const genesisBlock = Block.genesis()

    it('returns a Block instance', () => {
      expect(genesisBlock instanceof Block).toBe(true)
    })

    it('returns the genesis data', () => {
      expect(genesisBlock).toEqual(GENSIS_DATA)
    })
  })

  describe('mineBlock()', () => {
    const lastBlock = Block.genesis()
    const data = 'mined data'
    const minedBlock = Block.mineBlock({ lastBlock, data })

    it('returns a Block instance', () => {
      expect(minedBlock instanceof Block).toBe(true)
    })

    it('sets the `lastHash` to be the `hash` of the lastBlock', () => {
      expect(minedBlock.lastHash).toEqual(lastBlock.hash)
    })

    it('sets the `data`', () => {
      expect(minedBlock.data).toEqual(data)
    })

    it('sets a timestamp', () => {
      expect(minedBlock.timestamp).not.toEqual(undefined)
    })

    it('creates a SHA256 `hash` based on the proper inputs', () => {
      // console.log(minedBlock)
      expect(minedBlock.hash).toEqual(
        cryptoHash(minedBlock.timestamp, lastBlock.hash, data)
      )
    })
  })
})
