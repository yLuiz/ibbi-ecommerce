import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Purchase } from '@prisma/client';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { CreatePurchaseDTO } from 'src/shared/dtos/input/CreatePurchaseDTO';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';
import { HandleError } from 'src/shared/errors/handleError';
import { MESSAGE } from 'src/shared/messages';
import { IProductFilters } from 'src/shared/interfaces/IProductFilters';
import { IPaginationQuery } from 'src/shared/interfaces/IPaginationQuery';
import { IPurchaseFilter } from 'src/shared/interfaces/IPurchaseFilter';

@Injectable()
export class PurchaseService {

    constructor(private _prismaService: PrismaService, private _productService: ProductService, private _userService: UserService) { }

    async create(purchaseDTO: CreatePurchaseDTO): Promise<Purchase> {
        // Verifica se usuário e produto existem, caso não, será lançado uma HttpException.
        const client = await this._userService.findById(purchaseDTO.client_id);
        const product = await this._productService.findById(purchaseDTO.product_id);


        // Verifica se o estoque do produto é suficiente para a compra.
        if (product.stock < purchaseDTO.quantity) {
            throw new HttpException(MESSAGE.PRODUCT.STOCK_NOT_ENOUGH, HttpStatus.BAD_REQUEST);
        }

        const priceQuantity = (product.price * purchaseDTO.quantity).toFixed(2);

        if (priceQuantity !== purchaseDTO.total_price.toFixed(2)) {
            throw new HttpException(MESSAGE.PURCHASE.TOTAL_PRICE_NOT_CORRECT, HttpStatus.BAD_REQUEST);
        }

        const newPurchase: Prisma.PurchaseCreateInput = {
            product: {
                connect: { id: product.id },
            },
            client: {
                connect: { id: client.id },
            },
            seller: {
                connect: { id: product.seller_id },
            },
            quantity: purchaseDTO.quantity,
            total_price: purchaseDTO.total_price,
        }

        await this._productService.update(purchaseDTO.product_id, {
            stock: product.stock - purchaseDTO.quantity,
        });


        return await this._prismaService.purchase.create({
            data: newPurchase
        });
    }

    async getAll(query: IPaginationQuery, filters: IPurchaseFilter) {
        const { client, seller, product } = filters;

        const whereFilters: Prisma.PurchaseWhereInput = {
            product: {
                id: +product
            },
            client: {
                id: +client
            },
            seller: {
                id: +seller
            },
        }

        let realFilter: Prisma.PurchaseWhereInput = {};
        Object.keys(whereFilters).forEach(key => {
            realFilter = {
                ...realFilter,
                [key]: whereFilters[key]
            }
        });

        return await this._prismaService.purchase.findMany({
            skip: +query.skip,
            take: +query.take,
            include: {
                client: true,
                seller: true,
                product: true,
            },
            where: realFilter
        });
    }

    async getById() {

    }

    async getByProductId(productId: number) {

    }

    async getByClientId() { }

    async getBySellerId() {

    }

    async delete(id: number) {

    }
}
