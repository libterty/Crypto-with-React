const hexToBinary = require('hex-to-binary');
const cryptoHash = require('./crypto-hash');

describe('crytoHash()', () => {
  // 2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae
  // b2213295d564916f89a6a42455567c87c3f480fcd7a1c15e220f17d7169a790b
  // 0010110000100110101101000110101101101000111111111100011010001111111110011001101101000101001111000001110100110000010000010011010000010011010000100010110101110000011001001000001110111111101000001111100110001010010111101000100001100010011001101110011110101110
  it('generates a SHA256 hashed output', () => {
    expect(cryptoHash('foo')).toEqual(
      'b2213295d564916f89a6a42455567c87c3f480fcd7a1c15e220f17d7169a790b'
    );
  });

  it('produces the same hash with the same input arguments in any order', () => {
    expect(cryptoHash('one', 'two', 'three')).toEqual(
      cryptoHash('three', 'two', 'one')
    );
  });

  it('produces a unique hash when the properties have changed on an input', () => {
    const foo = {};
    const orginalHash = cryptoHash(foo);
    foo['a'] = 'a';

    expect(cryptoHash(foo)).not.toEqual(orginalHash);
  });
});
