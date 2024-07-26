import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";
import { Roles } from "src/shared/enum/roles";
import { MESSAGE } from "src/shared/messages";

export class CreateUserDTO {

    @ApiProperty({
        example: 'Luiz Victor'
    })
    @IsNotEmpty({ message: MESSAGE.USER.NAME_NOT_EMPTY })
    @IsString({
        message: MESSAGE.USER.NAME_SHOULD_BE_STRING
    })
    name: string;

    @ApiProperty({
        example: 'luizteste@gmail.com'
    })
    @IsNotEmpty({ message: MESSAGE.USER.EMAIL_NOT_EMPTY })
    @IsString({
        message: MESSAGE.USER.EMAIL_INVALID
    })
    @IsEmail(undefined, { message: MESSAGE.USER.EMAIL_INVALID })
    email: string;

    @ApiProperty({
        example: 'luiz@123'
    })
    @IsString({ message: MESSAGE.USER.PASSWORD_SHOULD_BE_STRING })
    @IsNotEmpty({ message: MESSAGE.USER.PASSWORD_NOT_EMPTY })
    @Length(6, 255, { message: MESSAGE.USER.PASSWORD_LENGTH })
    password: string;

    @ApiProperty({
        description: 'Role that user will be registered. (Seller or Client)',
        example: 1
    })
    @IsNotEmpty({ message: MESSAGE.USER.ROLE_NOT_EMPTY })
    @IsEnum(Roles, { message: MESSAGE.USER.ROLE_INVALID })
    @IsNumber(undefined, { message: MESSAGE.USER.ROLE_INVALID })
    role: Roles;
}