const hexToBinary = require('hex-to-binary');
const cryptoHash = require('./crypto-hash');

describe('crytoHash()', () => {
  // 2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae
  it('generates a SHA256 hashed output', () => {
    expect(cryptoHash('foo')).toEqual(
      '0010110000100110101101000110101101101000111111111100011010001111111110011001101101000101001111000001110100110000010000010011010000010011010000100010110101110000011001001000001110111111101000001111100110001010010111101000100001100010011001101110011110101110'
    );
  });

  it('produces the same hash with the same input arguments in any order', () => {
    expect(cryptoHash('one', 'two', 'three')).toEqual(
      cryptoHash('three', 'two', 'one')
    );
  });
});
