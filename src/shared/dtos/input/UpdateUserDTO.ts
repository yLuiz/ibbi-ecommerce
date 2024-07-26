import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";
import { MESSAGE } from "src/shared/messages";

export class UpdateUserDTO {
    @ApiProperty({
        example: 'Luiz Victor'
    })
    @IsNotEmpty({ message: MESSAGE.USER.NAME_NOT_EMPTY })
    @IsString({
        message: MESSAGE.USER.NAME_SHOULD_BE_STRING
    })
    name?: string;

    @ApiProperty({
        example: 'luizteste@gmail.com'
    })
    @IsNotEmpty({ message: MESSAGE.USER.EMAIL_NOT_EMPTY })
    @IsString({
        message: MESSAGE.USER.EMAIL_INVALID
    })
    @IsEmail(undefined, { message: MESSAGE.USER.EMAIL_INVALID })
    email?: string;

    @ApiProperty({
        example: 'luiz@123'
    })
    @IsString({ message: MESSAGE.USER.PASSWORD_SHOULD_BE_STRING })
    @IsNotEmpty({ message: MESSAGE.USER.PASSWORD_NOT_EMPTY })
    @Length(6, 255, { message: MESSAGE.USER.PASSWORD_LENGTH })
    password?: string;
}