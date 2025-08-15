'use strict';

const fs = require('fs');
const path = require('path');

const STORAGE_PATH = path.join(__dirname, '../../storage');

beforeAll(() => {
  if (!fs.existsSync(STORAGE_PATH)) fs.mkdirSync(STORAGE_PATH);

  const dummyFile = path.join(STORAGE_PATH, 'dummy.jpg');
  if (!fs.existsSync(dummyFile)) {
    fs.writeFileSync(dummyFile, 'dummy content');
  }
});

afterAll(() => {
  const dummyFile = path.join(STORAGE_PATH, 'dummy.jpg');
  if (fs.existsSync(dummyFile)) fs.unlinkSync(dummyFile);
});
