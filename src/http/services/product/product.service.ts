import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { CreateProductDTO } from 'src/shared/dtos/input/CreateProductDTO';
import { UpdateProductDTO } from 'src/shared/dtos/input/UpdateProductDTO';
import { IPaginationQuery } from 'src/shared/interfaces/IPaginationQuery';
import { MESSAGE } from 'src/shared/messages';
import { CategoryService } from '../category/category.service';
import { IProductFilters } from 'src/shared/interfaces/IProductFilters';

@Injectable()
export class ProductService {
    constructor(
        private _prismaService: PrismaService,
        private _categoryService: CategoryService
    ) { }

    async create(product: CreateProductDTO): Promise<Product> {

        const productExists = await this._prismaService.product.findFirst({
            where: { name: product.name },
        })

        if (productExists) {
            throw new HttpException(MESSAGE.PRODUCT.NAME_ALREADY_EXISTS, HttpStatus.CONFLICT);
        }

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
        } as Prisma.ProductCreateInput;

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

    async findAllByFilters(query: IPaginationQuery, filters: IProductFilters) {

        const { name, description, categories } = filters;

        // Os ids do parametro chegam em string, aqui é necessário fazer a conversão para number.
        const serializedCategoriesId = categories?.split(',').map((category) => !isNaN(+category) ? 0 : +category);

        const whereFilters: Prisma.ProductWhereInput = {
            category: {
                id: {
                    in: serializedCategoriesId,
                }
            },
            name: {
                contains: name
            },
            description: {
                contains: description
            }
        }

        let realFilter: Prisma.ProductWhereInput = {};
        Object.keys(whereFilters).forEach(key => {
            realFilter = {
                ...realFilter,
                [key]: whereFilters[key]
            }
        });

        return await this._prismaService.product.findMany({
            skip: +query.skip,
            take: +query.take,
            include: {
                category: true,
            },
            where: realFilter
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

        // Verifica se a categoria existe, caso não exista, a própria função irá lançar uma HttpException.
        await this._categoryService.findById(product.category_id);

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
            path_image: `/file/${imagePath}`
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
