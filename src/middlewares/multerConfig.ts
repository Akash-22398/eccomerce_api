import fs from 'fs';
import path from 'path';
import multer, { StorageEngine } from 'multer';
import dotenv from 'dotenv';

dotenv.config();

const baseDirectory = process.cwd();

// Fetch directory name from environment variables
const uploadDir = process.env.FILE_UPLOAD_DIR || '/public/uploads'; // Fallback to 'uploads' if env var is not set
const numoPdfsDirectory = path.join(baseDirectory, uploadDir);

// Ensure the directory exists
if (!fs.existsSync(numoPdfsDirectory)) {
    fs.mkdirSync(numoPdfsDirectory, { recursive: true });
}

// Multer storage configuration
const storage: StorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        try {
            const objectType = req.body?.objectType;
            const pdfSubfolderPath = objectType ? path.join(numoPdfsDirectory, objectType) : numoPdfsDirectory;

            if (!fs.existsSync(pdfSubfolderPath)) {
                fs.mkdirSync(pdfSubfolderPath, { recursive: true });
            }

            cb(null, pdfSubfolderPath);
        } catch (error) {
            cb(new Error('Error creating directory for upload'), '');
        }
    },
    filename: (req: any, file: any, cb: any) => {
        try {
            const uniqueSuffix = Date.now();
            const extension = path.extname(file.originalname); // Get the file extension
            cb(null, `${uniqueSuffix}_${file.originalname}`);
        } catch (error) {
            cb(new Error('Error generating filename'), '');
        }
    },
});

// Multer instance
const upload = multer({ storage });

module.exports = {
    uploadSingle: upload.single('file'),
  };