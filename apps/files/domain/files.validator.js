'use strict';

const { ALLOWED_TYPES, MAX_FILE_SIZE } = require('../../../libraries/env-loader/env');

function validateFile(file) {
    if (!file) throw new Error('File is required');
    const ext = file.originalname.split('.').pop();
    if (!ALLOWED_TYPES.includes(ext)) throw new Error('File type not allowed');
    if (file.size > MAX_FILE_SIZE) throw new Error('File too large');
}

function validateFiles(files) {
    if (!files || !files.length) throw new Error('Files are required');
    files.forEach(validateFile);
}

module.exports = { validateFile, validateFiles };