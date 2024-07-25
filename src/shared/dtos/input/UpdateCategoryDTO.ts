import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length, MaxLength, MinLength } from "class-validator";
import { MESSAGE } from "src/shared/messages";

export class UpdateCategoryDTO {

    @ApiProperty({ example: "Informática" })
    @IsString({ message: MESSAGE.CATEGORY.NAME_SHOULD_BE_STRING })
    @IsNotEmpty({ message: MESSAGE.CATEGORY.NAME_SHOULD_NOT_BE_EMPTY })
    @Length(3, 50, { message: MESSAGE.CATEGORY.NAME_LENGHT })
    name: string;

    @IsString({ message: MESSAGE.CATEGORY.NAME_SHOULD_BE_STRING })
    @IsNotEmpty({ message: MESSAGE.CATEGORY.NAME_SHOULD_NOT_BE_EMPTY })
    @Length(3, 255, { message: MESSAGE.CATEGORY.DESCRIPTION_LENGHT })
    @ApiProperty({ example: "Categoria de produtos como: computadores, acessórios, mouse, fones e etc" })
    description: string;
}