const uuidv4 = require('uuid').v4;
const sha1 = require('sha1');
const emailValidator = require('deep-email-validator');

// Generates a UUID
const _generateUUID = () => {
  const token = uuidv4();
  return token;
};

// Hash a password
const _hashPassword = (password) => {
  const hashedPassword = sha1(password);
  return hashedPassword;
};

// Validate Email
const _validateEmail = async (email) => {
  const { valid, reason, validators } = await emailValidator.validate(email);
  return valid;
//   return [valid, reason, validators];
};

module.exports = { _generateUUID, _hashPassword, _validateEmail };
