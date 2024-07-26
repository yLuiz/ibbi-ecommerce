import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Purchase } from '@prisma/client';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { CreatePurchaseDTO } from 'src/shared/dtos/input/CreatePurchaseDTO';
import { IPaginationQuery } from 'src/shared/interfaces/IPaginationQuery';
import { IPurchaseFilter } from 'src/shared/interfaces/IPurchaseFilter';
import { MESSAGE } from 'src/shared/messages';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';
import { IPaginationData } from 'src/shared/interfaces/IPaginationData';



@Injectable()
export class PurchaseService {

    constructor(private _prismaService: PrismaService, private _productService: ProductService, private _userService: UserService) { }

    async create(purchaseDTO: CreatePurchaseDTO): Promise<Purchase> {
        // Verifica se usuário e produto existem, caso não, será lançado uma HttpException.
        const client = await this._userService.findById(purchaseDTO.client_id);
        const product = await this._productService.findById(purchaseDTO.product_id);

        if (client.id === product.seller_id) {
            throw new HttpException(MESSAGE.PURCHASE.CANNOT_BUY_OWN_PRODUCT, HttpStatus.BAD_REQUEST);
        }

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
            sales_quantity: product.sales_quantity + purchaseDTO.quantity
        });


        return await this._prismaService.purchase.create({
            data: newPurchase
        });
    }

    async findAll(query: IPaginationQuery, filters: IPurchaseFilter): Promise<IPaginationData<Purchase[]>> {
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

        const purchases = await this._prismaService.purchase.findMany({
            skip: +query.skip,
            take: +query.take,
            include: {
                client: true,
                seller: true,
                product: true,
            },
            where: realFilter
        });

        const total = await this._prismaService.purchase.count({
            where: realFilter
        });

        return {
            data: purchases,
            total
        };
    }

    async findById(id: number) {
        const purchase = await this._prismaService.purchase.findFirst({
            where: {
                id
            }
        });

        if (!purchase) {
            throw new HttpException(MESSAGE.PURCHASE.NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        return purchase;
    }

    async delete(id: number) {
        // Verifica se a compra existe, caso não, a função lançará uma HttpException
        await this.findById(id);

        const purchaseDeleted = await this._prismaService.purchase.delete({
            where: {
                id
            }
        });

        return purchaseDeleted;
    }
}
