'use strict';

require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    STORAGE_PATH: process.env.STORAGE_PATH || '/storage',
    MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE) || 2097152,
    ALLOWED_TYPES: process.env.ALLOWED_TYPES ? process.env.ALLOWED_TYPES.split(',') : ['jpg', 'png', 'pdf']
};