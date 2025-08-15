'use strict';

const express = require('express');
const router = express.Router();
const { uploadMiddleware } = require('../infra/upload.middleware');
const filesController = require('./files.controller');

router.post('/upload/single', uploadMiddleware.single('file'), filesController.uploadSingleFile);
router.post('/upload/multiple', uploadMiddleware.array('files', 10), filesController.uploadMultipleFiles);
router.get('/', filesController.listFiles);
router.get('/:filename', filesController.downloadFile);
router.delete('/:filename', filesController.deleteFile);

module.exports = router;