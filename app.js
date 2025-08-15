'use strict';

const express = require('express');
const app = express();
const { errorHandler } = require('./libraries/error-handler/error-handler');

const filesRoutes = require('./apps/files/api/files.routes');

app.use(express.json());
app.use('/files', filesRoutes);

// Global error handler
app.use(errorHandler);

module.exports = app;