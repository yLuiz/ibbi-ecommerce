import { MulterModuleOptions } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as path from 'node:path';

export const multerConfig: MulterModuleOptions = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const uploadPath = path.join(process.cwd(), 'upload');
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
        },
    }),
};
