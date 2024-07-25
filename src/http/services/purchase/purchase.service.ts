import { HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Purchase } from '@prisma/client';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { CreatePurchaseDTO } from 'src/shared/dtos/input/CreatePurchaseDTO';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';
import { HandleError } from 'src/shared/errors/handleError';
import { MESSAGE } from 'src/shared/messages';

@Injectable()
export class PurchaseService {

    constructor(private _prismaService: PrismaService, private _productService: ProductService, private _userService: UserService) { }

    async create(purchaseDTO: CreatePurchaseDTO): Promise<Purchase> {

        try {
            // Verifica se usuário e produto existem, caso não, será lançado uma HttpException.
            const client = await this._userService.findById(purchaseDTO.client_id);
            const product = await this._productService.findById(purchaseDTO.product_id);

            // Verifica se o estoque do produto é suficiente para a compra.
            if (product.stock < purchaseDTO.quantity) {
                throw new HandleError({ message: MESSAGE.PRODUCT.STOCK_NOT_ENOUGH, statusCode: HttpStatus.BAD_REQUEST });
            }

            const newPurchase: Prisma.PurchaseCreateInput = {
                product: {
                    connect: { id: product.id },
                },
                user: {
                    connect: { id: client.id },
                },
                quantity: purchaseDTO.quantity,
                total_price: purchaseDTO.total_price,
            }


            return await this._prismaService.purchase.create({
                data: newPurchase
            });
        } catch (error) {
            throw new HandleError(error);
        }
    }

}
