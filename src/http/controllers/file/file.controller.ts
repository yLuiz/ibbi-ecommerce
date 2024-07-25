import { Controller, Delete, Get, Param, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { FileService } from 'src/http/services/file/file.service';

@ApiTags('Files')
@Controller('file')
export class FileController {
    constructor(private _fileService: FileService) { }
    @ApiOperation({
        summary: 'Get file by filename.'
    })
    @Get(':filename')
    getFileByFilename(@Param('filename') filename: string, @Res() response: Response) {
        return this._fileService.getFileByFilename(filename, response);
    }

    @ApiOperation({
        summary: 'Delete file by filename.'
    })
    @Delete(':filename')
    deleteFileByFilename(@Param('filename') filename: string, @Res() response: Response) {
        return this._fileService.deleteFileByFilename(filename, response);
    }
}
