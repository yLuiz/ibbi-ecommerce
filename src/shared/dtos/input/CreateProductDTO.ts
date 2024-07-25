import { ApiProperty } from "@nestjs/swagger";
import { Allow, IsNotEmpty, IsNumber, IsString, Length, Min } from "class-validator";
import { MESSAGE } from "src/shared/messages";

export class CreateProductDTO {

    @ApiProperty({
        example: "Maçã"
    })
    @IsNotEmpty({ message: MESSAGE.PRODUCT.NAME_NOT_EMPTY })
    @IsString({ message: MESSAGE.PRODUCT.NAME_SHOULD_BE_STRING })
    @Length(3, 255, {
        message: MESSAGE.PRODUCT.NAME_LENGHT
    })
    name: string;


    @ApiProperty({
        example: "Uma fruta vermelha doce."
    })
    @IsNotEmpty({ message: MESSAGE.PRODUCT.DESCRIPTION_NOT_EMPTY })
    @IsString({ message: MESSAGE.PRODUCT.DESCRIPTION_SHOULD_BE_STRING })
    @Length(3, 255, {
        message: MESSAGE.PRODUCT.DESCRIPTION_LENGHT
    })
    description: string;


    @ApiProperty({
        example: 2.90
    })
    @IsNotEmpty({ message: MESSAGE.PRODUCT.PRICE_NOT_EMPTY })
    @IsNumber(undefined, { message: MESSAGE.PRODUCT.PRICE_SHOULD_BE_NUMBER })
    @Min(0, { message: MESSAGE.PRODUCT.PRICE_NOT_NEGATIVE })
    @IsNumber(undefined, { message: MESSAGE.PRODUCT.PRICE_SHOULD_BE_NUMBER })
    price: number;

    @ApiProperty({
        example: 100
    })
    @IsNotEmpty({ message: MESSAGE.PRODUCT.STOCK_NOT_EMPTY })
    @IsNumber(undefined, { message: MESSAGE.PRODUCT.STOCK_SHOULD_BE_NUMBER })
    @Min(0, { message: MESSAGE.PRODUCT.STOCK_NOT_NEGATIVE })
    stock: number;

    @ApiProperty({
        example: 1
    })
    @IsNotEmpty({ message: MESSAGE.PRODUCT.CATEGORY_NOT_EMPTY })
    @IsNumber(undefined, { message: MESSAGE.PRODUCT.CATEGORY_SHOULD_BE_NUMBER })
    @Min(0, { message: MESSAGE.PRODUCT.CATEGORY_NOT_NEGATIVE })
    category_id: number;
}