import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { unlinkSync } from 'fs';
import { join } from 'path';
import { MESSAGE } from 'src/shared/messages';

@Injectable()
export class FileService {

    getFileByFilename(filename: string, response: Response) {
        const filePath = join(process.cwd(), 'upload', filename);
        return response.sendFile(filePath);
    }


    deleteFileByFilename(filename: string, response: Response) {
        const filePath = join(process.cwd(), 'upload', filename);

        try {
            unlinkSync(filePath);
        }
        catch (err) {
            throw new HttpException(MESSAGE.SERVER.FILE_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        return response.json({
            message: [`File ${filename} deleted successfully`]
        });
    }
    deleteFileByFilenameNoResopnse(filename: string) {

        const filePath = join(process.cwd(), 'upload', filename);
        try {
            unlinkSync(filePath);
            return true;
        }
        catch (err) {
            return false;
        }

    }
}
