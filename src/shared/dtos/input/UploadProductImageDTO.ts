import { ApiProperty } from "@nestjs/swagger";
import { Allow } from "class-validator";

export class UploadProductImageDTO {
    @ApiProperty({ type: 'string', format: 'binary', required: true })
    @Allow()
    image: Express.Multer.File;
}