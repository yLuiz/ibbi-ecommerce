import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { CreateProductDTO } from 'src/shared/dtos/input/CreateProductDTO';
import { UpdateProductDTO } from 'src/shared/dtos/input/UpdateProductDTO';
import { IPaginationData } from 'src/shared/interfaces/IPaginationData';
import { IPaginationQuery } from 'src/shared/interfaces/IPaginationQuery';
import { IProductFilter } from 'src/shared/interfaces/IProductFilter';
import { MESSAGE } from 'src/shared/messages';
import { CategoryService } from '../category/category.service';
import { UserService } from '../user/user.service';

@Injectable()
export class ProductService {
  constructor(
    private _prismaService: PrismaService,
    private _categoryService: CategoryService,
    private _userService: UserService,
  ) {}

  async create(product: CreateProductDTO): Promise<Product> {
    // Verifica se o usuário que está criando realmente existe, caso não, a própria função lançará uma HttpException
    await this._userService.findById(product.seller_id);

    const productExists = await this._prismaService.product.findFirst({
      where: { name: product.name },
    });

    if (productExists) {
      throw new HttpException(
        MESSAGE.PRODUCT.NAME_ALREADY_EXISTS,
        HttpStatus.CONFLICT,
      );
    }

    // Verifica se a categoria existe, caso não, a própria função lançará uma HttpException.
    await this._categoryService.findById(product.category_id);

    const newProduct = {
      name: product.name,
      description: product.description,
      price: product.price,
      path_image: null,
      stock: product.stock,
      seller: {
        connect: { id: product.seller_id },
      },
      category: {
        connect: { id: product.category_id },
      },
    } as Prisma.ProductCreateInput;

    return await this._prismaService.product.create({
      data: {
        ...newProduct,
      },
    });
  }

  async findAll(query: IPaginationQuery): Promise<IPaginationData<Product[]>> {
    
    const offset = query.skip === 0 ? query.take : query.skip * query.take; 

    const products = await this._prismaService.product.findMany({
      skip: offset,
      take: +query.take,
      include: {
        category: true,
        seller: true,
      },
      orderBy: {
        id: 'desc',
      },
      where: {
        stock: { notIn: [0] },
      },
    });

    const total = await this._prismaService.product.count();

    return {
      data: products,
      total,
    };
  }

  async findAllByFilters(
    query: IPaginationQuery,
    filters: IProductFilter,
  ): Promise<IPaginationData<Product[]>> {
    const { name, description, categories, nostock } = filters;

    // Os ids do parametro chegam em string, aqui é necessário fazer a conversão para number.
    const serializedCategoriesId = categories
      ?.split(',')
      .map((category) => (isNaN(+category) ? 0 : +category));

    const whereFilters: Prisma.ProductWhereInput = {
      category: {
        id: {
          in: categories ? [...serializedCategoriesId] : undefined,
        },
      },

      stock: {
        notIn: nostock === 'true' ? undefined : [0],
      },
      AND: [
        {
          OR: [
            {
              name: {
                contains: name,
              },
            },
            {
              description: {
                contains: description,
              },
            },
          ],
        },
      ],
    };

    // console.log(serializedCategoriesId);

    const offset = query.skip === 0 ? query.take : query.skip * query.take; 

    const products = await this._prismaService.product.findMany({
      skip: offset,
      take: +query.take,
      orderBy: {
        id: query.order.toLowerCase() as 'asc' | 'desc',
      },
      include: {
        category: true,
        seller: true,
      },
      where: whereFilters,
    });

    const total = await this._prismaService.product.count({
      where: whereFilters,
    });

    return {
      data: products,
      total,
    };
  }

  async findById(id: number): Promise<Product> {
    const product = await this._prismaService.product.findFirst({
      where: { id },
      include: {
        category: true,
        seller: true,
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
    await this.findById(id);

    return await this._prismaService.product.update({
      data: {
        path_image: `/file/${imagePath}`,
      },
      where: { id },
    });
  }

  async delete(id: number): Promise<Product> {
    // Verifica se o produto existe, caso não exista, a própria função irá lançar uma HttpException.
    await this.findById(id);

    return this._prismaService.product.delete({
      where: { id },
    });
  }
}
