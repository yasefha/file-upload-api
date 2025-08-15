const fs = require('fs');
const path = require('path');

const STORAGE_PATH = path.join(__dirname, 'storage');

if (!fs.existsSync(STORAGE_PATH)) {
  fs.mkdirSync(STORAGE_PATH, { recursive: true });
  console.log(`Created storage folder at ${STORAGE_PATH}`);
}

module.exports = STORAGE_PATH;
