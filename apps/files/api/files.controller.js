'use strict';

const filesService = require('../domain/files.service');
const filesValidator = require('../domain/files.validator');

async function uploadSingleFile(req, res, next) {
    try {
        const file = req.file;
        filesValidator.validateFile(file);
        const result = await filesService.uploadFile(file);
        res.json({ message: 'File uploaded successfully', file: result });
    } catch (err) {
        next(err);
    }
}

async function uploadMultipleFiles(req, res, next) {
    try {
        const files = req.files;
        filesValidator.validateFiles(files);
        const result = await filesService.uploadFiles(files);
        res.json({ message: 'Files uploaded successfully', files: result });
    } catch (err) {
        next(err);
    }
}

async function listFiles(req, res, next) {
    try {
        const files = await filesService.getFiles();
        res.json(files);
    } catch (err) {
        next(err);
    }
}

async function downloadFile(req, res, next) {
    try {
        const fileData = await filesService.getFileDetails(req.params.filename);
        res.download(fileData.path, fileData.originalName);
    } catch (err) {
        next (err);
    }
}

async function deleteFile(req, res, next) {
    try {
        await filesService.removeFile(req.params.filename);
        res.json({ message: 'File deleted successfully' });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    uploadSingleFile,
    uploadMultipleFiles,
    listFiles,
    downloadFile,
    deleteFile
}