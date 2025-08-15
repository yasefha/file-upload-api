# File Upload API

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![Build](https://img.shields.io/github/actions/workflow/status/yasefha/file-upload-api/nodejs.yml?branch=main)](https://github.com/yasefha/file-upload-api/actions)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

A simple API for uploading, listing, downloading, and deleting files.  
Built with Node.js & Express, using Multer for file handling.

## 📂 Project Structure
- **apps/files/api** → Routes & Controller
- **apps/files/domain** → Service & Validator
- **apps/files/data-access** → Repository
- **apps/files/infra** → Upload middleware
- **libraries** → Logger, env-loader, error-handler
- **storage/** → Local file storage

## 🔄 Request → Response Flow
1. **Client Request** → Example: `POST /files/upload/single` (form-data: file)  
2. **Route Layer** → `files.routes.js`, applies upload middleware  
3. **Controller Layer** → `files.controller.js`, calls validator & service  
4. **Validator Layer** → `files.validator.js` (checks file type, size, quantity)  
5. **Service Layer** → `files.service.js` (handles renaming, metadata generation, calls repository)  
6. **Repository Layer** → `files.repository.js` (saves files to storage or cloud)  
7. **Infra Layer** → Multer configuration  
8. **Libraries** → Logger, env-loader, error-handler  
9. **Response** → Returns JSON, e.g.  
   ```json
   {
     "message": "File uploaded successfully",
     "file": "1689554321-123456789.jpg"
   }

## 📌 API Endpoints

| Method | Endpoint               | Controller Function | Service Function | Repository Function |
| ------ | ---------------------- | ------------------- | ---------------- | ------------------- |
| POST   | /files/upload/single   | uploadSingleFile    | uploadFile       | saveFile            |
| POST   | /files/upload/multiple | uploadMultipleFiles | uploadFiles      | saveFile            |
| GET    | /files                 | listFiles           | getFiles         | getAllFiles         |
| GET    | /files/\:filename      | downloadFile        | getFileDetails   | getFile             |
| DELETE | /files/\:filename      | deleteFile          | removeFile       | deleteFile          |

## ⚡ Setup

1. Clone the repository:
```bash
git clone https://github.com/<username>/file-upload-api.git
```
2. Install dependencies:
```bash
npm install
```
3. Create a .env file for configuration (e.g., PORT)
4. Start the server:
```bash
npm run dev
```
5. Run tests:
```bash
npm test
```

## 🛠 Tools & Libraries

- Node.js
- Express
- Multer
- Jest (unit & integration testing)

## 💻 Example Requests

**Upload Single File**
```bash
curl -X POST http://localhost:3000/files/upload/single \
  -F "file=@/path/to/your/file.jpg"
```

**Upload Multiple Files**
```bash
curl -X POST http://localhost:3000/files/upload/multiple \
  -F "files=@/path/to/file1.jpg" \
  -F "files=@/path/to/file2.png"
```

**List Files**
```bash
curl http://localhost:3000/files
```

**Download File**
```bash
curl http://localhost:3000/files/1689554321-123456789.jpg --output file.jpg
```

**Delete File**
```bash
curl -X DELETE http://localhost:3000/files/1689554321-123456789.jpg
```

## 📜 License

This project is licensed under the MIT License.
