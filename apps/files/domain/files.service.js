'use strict';

const filesRepository = require('../data-access/files.repository');

async function uploadSingleFile(file) {
    const metadata = {
        originalName: file.originalName,
        filename: file.filename,
        size: file.size,
        path: file.path,
        createdAt: new Date()
    };
    await filesRepository.saveFile(file);
    return metadata.filename;
}

async function uploadFiles(files) {
    const results = [];
    for (const file of files) {
        results.push(await uploadSingleFile(file));
    }
    return results;
}

async function getFiles() {
    return await filesRepository.getAllFiles();
}

async function getFileDetails(filename) {
    return await filesRepository.getFile(filename);
}

async function removeFile(filename) {
    await filesRepository.deleteFile(filename);
}

module.exports = { uploadFile: uploadSingleFile, uploadFiles, getFiles, getFileDetails, removeFile };