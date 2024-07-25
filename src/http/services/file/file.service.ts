import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Injectable()
export class FileService {

    getFileByFilename(filename: string, response: Response) {
        const filePath = join(process.cwd(), 'tmp', filename);
        console.log(filePath);


        return response.sendFile(filePath);
    }

    deleteFileByFilename(filename: string, response: Response) {
        const filePath = join(process.cwd(), '..', 'tmp', filename);
        console.log(filePath);
        return response.json({
            message: `File ${filename} deleted successfully`
        })
    }
}
