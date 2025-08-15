'use strict';

const fs = require('fs');
const path = require('path');
const STORAGE_PATH = require('../setupStorage');

function saveFile(file) {
    // File has saved by multer, just return filename
    return Promise.resolve(file.filename);
}

function getAllFiles() {
    const files = fs.readdirSync(STORAGE_PATH);
    return files.map(filename => ({
        filename,
        path: path.join(STORAGE_PATH, filename)
    }));
}

function getFile(filename) {
    const filePath = path.join(STORAGE_PATH, filename);
    if (!fs.existsSync(filePath)) throw new Error('File not found');
    return { path: filePath, originalName: filename };
}

function deleteFile(filename) {
    const filePath = path.join(STORAGE_PATH, filename);
    if (!fs.existsSync(filePath)) throw new Error('File not found');
    fs.unlinkSync(filePath);
    return true;
}

module.exports = { saveFile, getAllFiles, getFile, deleteFile };
