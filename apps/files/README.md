# Files Module

This module handles all operations related to file management: upload, list, download, and delete.

## Folder Structure
```
files/
├─ api/
│ ├─ files.routes.js # Define API endpoints
│ └─ files.controller.js # Controller for handling requests
├─ domain/
│ ├─ files.service.js # Business logic for file operations
│ └─ files.validator.js # File validation (type, size, count)
├─ data-access/
│ └─ files.repository.js # Interface with local or cloud storage
├─ infra/
│ └─ upload.middleware.js # Multer middleware for file uploads
├─ __tests__/
│ └─ files.test.js # Unit & integration tests
└─ README.md
```

## API Endpoints

| Endpoint                       | Method | Description            |
|--------------------------------|--------|------------------------|
| /files/upload/single            | POST   | Upload a single file   |
| /files/upload/multiple          | POST   | Upload multiple files  |
| /files                          | GET    | List all files         |
| /files/:filename                | GET    | Download a file        |
| /files/:filename                | DELETE | Delete a file          |

## Configuration

- `ALLOWED_TYPES` → Allowed file types (`jpg,png,pdf`)  
- `MAX_FILE_SIZE` → Maximum file size (default 2MB)  
- `STORAGE_PATH` → Local folder for storing uploaded files  

## Usage

1. Ensure the `storage/` folder exists.  
2. Start the server:
```bash
npm install
npm run dev
```
3. Test endpoints using Postman or automated tests with `supertest`.

## Notes
- Multer middleware handles file type and size validation
- All errors are handled globally by `error-handler.js`.
