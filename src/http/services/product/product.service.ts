import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { CreateProductDTO } from 'src/shared/dtos/input/CreateProductDTO';
import { UpdateProductDTO } from 'src/shared/dtos/input/UpdateProductDTO';
import { IPaginationQuery } from 'src/shared/interfaces/IPaginationQuery';
import { MESSAGE } from 'src/shared/messages';
import { CategoryService } from '../category/category.service';
import { IResponseEntity } from 'src/shared/dtos/output/IResponseEntity';

@Injectable()
export class ProductService {
    constructor(
        private _prismaService: PrismaService,
        private _categoryService: CategoryService
    ) { }

    async create(product: CreateProductDTO): Promise<Product> {

        // Verifica se a categoria existe, caso não, a própria função lançará uma HttpException.
        await this._categoryService.findById(product.category_id);

        const newProduct = {
            name: product.name,
            description: product.description,
            price: product.price,
            path_image: null,
            stock: product.stock,
            category: {
                connect: { id: product.category_id },
            }
        } as any

        return await this._prismaService.product.create({
            data: {
                ...newProduct
            }
        });
    }

    async findAll(query: IPaginationQuery) {
        return await this._prismaService.product.findMany({
            skip: +query.skip,
            take: +query.take,
            include: {
                category: true,
            },
        });
    }

    async findById(id: number): Promise<Product> {
        const product = await this._prismaService.product.findFirst({
            where: { id },
            include: {
                category: true,
            },
        });

        if (!product) {
            throw new HttpException(MESSAGE.PRODUCT.NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        return product;
    }

    async update(id: number, product: UpdateProductDTO): Promise<Product> {

        // Verifica se o produto existe, caso não exista, a própria função irá lançar uma HttpException.
        await this.findById(id);

        return await this._prismaService.product.update({
            data: product,
            where: { id },
        });
    }

    async updatePathImage(id: number, imagePath: string): Promise<Product> {
        let product = await this.findById(id) as any;

        delete product.id;
        delete product.category;

        product = {
            ...product,
            path_image: `http://localhost:3000/${imagePath}`
        };

        return await this._prismaService.product.update({
            data: product,
            where: { id },
        });
    }

    async delete(id: number): Promise<Product> {

        // Verifica se o produto existe, caso não exista, a própria função irá lançar uma HttpException.
        await this.findById(id);

        return this._prismaService.product.delete({
            where: { id }
        });
    }

    async getTotal() {
        return await this._prismaService.product.count();
    }
}
