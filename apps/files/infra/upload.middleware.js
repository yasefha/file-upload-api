'use strict';

const multer = require('multer');
const path = require('path');
const { STORAGE_PATH, MAX_FILE_SIZE, ALLOWED_TYPES } = require('../../../libraries/env-loader/env');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, STORAGE_PATH);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).slice(1);
    if (ALLOWED_TYPES.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error('File type not allowed'), false);
    }
};

const uploadMiddleware = multer({
    storage,
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter
});

module.exports = { uploadMiddleware };