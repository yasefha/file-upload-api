'use strict';

const request = require('supertest');
const fs = require('fs');
const path = require('path');
const app = require('../../../app');

const STORAGE_PATH = path.join(__dirname, '../../storage');

describe('File Upload API', () => {
    const testFilePath = path.join(__dirname, 'testfile.jpg');
    const uploadedFiles = [];

    // Create dummy file before test
    beforeAll(() => {
        if (!fs.existsSync(STORAGE_PATH)) fs.mkdirSync(STORAGE_PATH, { recursive: true });
        fs.writeFileSync(testFilePath, 'Hello world');
    });

    // Delete dummy file & uploaded file after tests
    afterAll(() => {
        if (fs.existsSync(testFilePath)) fs.unlinkSync(testFilePath);
        uploadedFiles.forEach(file => {
            const filePath = path.join(STORAGE_PATH, file);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        });

        // Optional
        try {
            fs.rmdirSync(STORAGE_PATH);
        } catch (err) {
            
        }
    });

    test('POST /files/upload/single - should upload a single file', async () => {
        const res = await request(app)
            .post('/files/upload/single/')
            .attach('file', testFilePath);
        
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('file');
        uploadedFiles.push(res.body.file);
    });

    test('POST /files/upload/multiple - should upload multiple files', async () => {
        const res = await request(app)
            .post('/files/upload/multiple')
            .attach('files', testFilePath)
            .attach('files', testFilePath);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('files');
        expect(res.body.files.length).toBe(2);
        uploadedFiles.push(...res.body.files);
    });

    test('GET /files - should list all files', async () => {
        const res = await request(app).get('/files');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    test('GET /files/:filename - should download a file', async () => {
        const filename = uploadedFiles[0];
        const res = await request(app).get(`/files/${filename}`);
        expect(res.statusCode).toBe(200);
        expect(res.header['content-disposition']).toContain(filename);
    });

    test('DELETE /files/:filename - should delete a file', async () => {
        const filename = uploadedFiles.shift();
        const res = await request(app).delete(`/files/${filename}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('File deleted successfully');
        const filePath = path.join(STORAGE_PATH, filename);
        expect(fs.existsSync(filePath)).toBe(false);
    });
});
