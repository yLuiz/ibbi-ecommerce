import { IsNotEmpty, IsNumber, Min } from "class-validator";
import { MESSAGE } from "src/shared/messages";

export class CreatePurchaseDTO {

    @IsNotEmpty({ message: MESSAGE.PRODUCT.NOT_EMPTY })
    @IsNumber(undefined, { message: MESSAGE.PRODUCT.INVALID_ID })
    product_id: number;

    @IsNotEmpty({ message: MESSAGE.USER.NOT_EMPTY })
    @IsNumber(undefined, { message: MESSAGE.USER.INVALID_ID })
    client_id: number;

    @Min(1, { message: MESSAGE.PURCHASE.QUANTITY_NOT_ZERO })
    @IsNotEmpty({ message: MESSAGE.PURCHASE.QUANTITY_NOT_ZERO })
    @IsNumber(undefined, { message: MESSAGE.PURCHASE.QUANTITY_SHOULD_BE_NUMBER })
    quantity: number;

    @Min(0, { message: MESSAGE.PURCHASE.TOTAL_PRICE_NOT_NEGATIVE })
    @IsNotEmpty({ message: MESSAGE.PURCHASE.TOTAL_PRICE_NOT_NEGATIVE })
    @IsNumber(undefined, { message: MESSAGE.PURCHASE.TOTAL_PRICE_SHOULD_BE_NUMBER })
    total_price: number;
}