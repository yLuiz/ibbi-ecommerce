import * as path from 'node:path';
import * as multer from 'multer';
import * as fs from 'node:fs';

export const multerConfig = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const uploadPath = path.resolve(__dirname, '..', '..', 'tmp');
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
        },
    }),
};
