import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, Length, Min } from "class-validator";
import { MESSAGE } from "src/shared/messages";

export class UpdateProductDTO {
    @ApiProperty({
        example: "Maçã"
    })
    @IsOptional()
    @IsString({ message: MESSAGE.PRODUCT.NAME_SHOULD_BE_STRING })
    @Length(3, 255, {
        message: MESSAGE.PRODUCT.NAME_LENGHT
    })
    name?: string;

    @ApiProperty({
        example: "Uma fruta vermelha doce."
    })
    @IsOptional()
    @IsString({ message: MESSAGE.PRODUCT.DESCRIPTION_SHOULD_BE_STRING })
    @Length(3, 255, {
        message: MESSAGE.PRODUCT.DESCRIPTION_LENGHT
    })
    description?: string;

    @ApiProperty({
        example: 2.90
    })
    @IsOptional()
    @IsNumber(undefined, { message: MESSAGE.PRODUCT.PRICE_SHOULD_BE_NUMBER })
    @Min(0, { message: MESSAGE.PRODUCT.PRICE_NOT_NEGATIVE })
    @IsNumber(undefined, { message: MESSAGE.PRODUCT.PRICE_SHOULD_BE_NUMBER })
    price?: number;

    @ApiProperty({
        example: 100
    })
    @IsOptional()
    @IsNumber(undefined, { message: MESSAGE.PRODUCT.STOCK_SHOULD_BE_NUMBER })
    @Min(0, { message: MESSAGE.PRODUCT.STOCK_NOT_NEGATIVE })
    stock?: number;

    @ApiProperty({
        example: 1
    })
    @IsOptional()
    @IsNumber(undefined, { message: MESSAGE.PRODUCT.CATEGORY_SHOULD_BE_NUMBER })
    @Min(0, { message: MESSAGE.PRODUCT.CATEGORY_NOT_NEGATIVE })
    category_id?: number;

    sales_quantity?: number;

    @ApiProperty({
        example: 1
    })
    @IsOptional()
    @IsNumber(undefined, { message: MESSAGE.USER.INVALID_ID })
    @Min(0, { message: MESSAGE.USER.INVALID_ID })
    seller_id?: number;
}