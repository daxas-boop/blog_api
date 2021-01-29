const jsonWebToken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function generatePassword(password) {
  const salt = crypto.randomBytes(32).toString('hex');
  const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return {
    salt,
    hash: genHash,
  };
}

function validPassword(password, hash, salt) {
  const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hash === hashVerify;
}

const issueJwt = (user) => {
  const pathKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
  const PRIV_KEY = fs.readFileSync(pathKey, 'utf8');

  const { _id } = user;

  const expiresIn = '1d';

  const payload = {
    sub: _id,
    iat: Date.now(),
  };

  const signedToken = jsonWebToken.sign(payload, PRIV_KEY, {
    expiresIn,
    algorithm: 'RS256',
  });

  return {
    token: `Bearer ${signedToken}`,
    expiresIn,
  };
};

module.exports = { issueJwt, generatePassword, validPassword };
