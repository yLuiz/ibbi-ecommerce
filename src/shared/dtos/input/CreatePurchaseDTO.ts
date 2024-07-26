import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { MESSAGE } from "src/shared/messages";

export class CreatePurchaseDTO {

    @ApiProperty({
        description: 'Product ID',
        type: 'integer',
        example: 1
    })
    @IsNotEmpty({ message: MESSAGE.PRODUCT.NOT_EMPTY })
    @IsNumber(undefined, { message: MESSAGE.PRODUCT.INVALID_ID })
    product_id: number;

    @ApiProperty({
        description: 'Client ID',
        type: 'integer',
        example: 1
    })
    @IsNotEmpty({ message: MESSAGE.USER.NOT_EMPTY })
    @IsNumber(undefined, { message: MESSAGE.USER.INVALID_ID })
    client_id: number;

    @ApiProperty({
        description: 'Seller ID',
        type: 'integer',
        example: 1
    })
    @IsNotEmpty({ message: MESSAGE.USER.NOT_EMPTY })
    @IsNumber(undefined, { message: MESSAGE.USER.INVALID_ID })
    seller_id: number;

    @ApiProperty({
        description: 'Observation about purchase or product.',
        type: 'string',
        example: 'Deve ser entregue na casa do cliente.'
    })
    @IsOptional()
    @IsString({ message: MESSAGE.PURCHASE.OBSERVATION_MUST_BE_STRING })
    observation?: string;

    @ApiProperty({
        description: 'Quantity of product',
        type: 'integer',
        example: 1
    })
    @Min(1, { message: MESSAGE.PURCHASE.QUANTITY_NOT_ZERO })
    @IsNotEmpty({ message: MESSAGE.PURCHASE.QUANTITY_NOT_ZERO })
    @IsNumber(undefined, { message: MESSAGE.PURCHASE.QUANTITY_SHOULD_BE_NUMBER })
    quantity: number;

    @ApiProperty({
        description: 'Total price of your purchase',
        type: 'integer',
        example: 10.90
    })
    @Min(0, { message: MESSAGE.PURCHASE.TOTAL_PRICE_NOT_NEGATIVE })
    @IsNotEmpty({ message: MESSAGE.PURCHASE.TOTAL_PRICE_NOT_NEGATIVE })
    @IsNumber(undefined, { message: MESSAGE.PURCHASE.TOTAL_PRICE_SHOULD_BE_NUMBER })
    total_price: number;
}