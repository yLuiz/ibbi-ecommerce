import { Controller, Delete, Get, Param, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileService } from 'src/http/services/file/file.service';
import { HandleError } from 'src/shared/errors/handleError';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Files')
@Controller('file')
export class FileController {
    constructor(private _fileService: FileService) { }
    @ApiOperation({
        summary: 'Get file by filename.'
    })
    @Get(':filename')
    getFileByFilename(@Param('filename') filename: string, @Res() response: Response) {
        try {
            return this._fileService.getFileByFilename(filename, response);
        }
        catch (error) {
            throw new HandleError(error);
        }
    }

    @ApiOperation({
        summary: 'Delete file by filename.'
    })
    @Delete(':filename')
    deleteFileByFilename(@Param('filename') filename: string, @Res() response: Response) {

        try {
            return this._fileService.deleteFileByFilename(filename, response);
        }
        catch (error) {
            throw new HandleError(error);
        }
    }
}
