const EC = require('elliptic').ec;

const ec = new EC('secp256k1');
const cryptoHash = require('./crypto-hash');

const verifySignature = ({ publicKey, data, signature }) => {
  const keyFromPublic = ec.keyFromPublic(publicKey, 'hex');
  // console.log('keyFromPublic', keyFromPublic);
  return keyFromPublic.verify(cryptoHash(data), signature);
};

module.exports = { ec, verifySignature, cryptoHash };
