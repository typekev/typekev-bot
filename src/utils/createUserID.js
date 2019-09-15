const { promisify } = require('util');
const { randomBytes } = require('crypto');

const randomBytesAsync = promisify(randomBytes);

module.exports = async function createUserID() {
  const buffer = await randomBytesAsync(16);

  return `dl_${buffer.toString('hex')}`;
};
