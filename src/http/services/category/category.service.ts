import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { CreateCategoryDTO } from 'src/shared/dtos/input/CreateCategoryDTO';
import { UpdateCategoryDTO } from 'src/shared/dtos/input/UpdateCategoryDTO';
import { IPaginationQuery } from 'src/shared/interfaces/IPaginationQuery';
import { MESSAGE } from 'src/shared/messages';

@Injectable()
export class CategoryService {

    constructor(private _prismaService: PrismaService) { }

    async create(category: CreateCategoryDTO): Promise<Category> {
        return await this._prismaService.category.create({ data: category });
    }

    async findAll(query: IPaginationQuery) {
        return await this._prismaService.category.findMany({
            skip: +query.skip,
            take: +query.take,
        });
    }

    async findById(id: number): Promise<Category> {
        const category = await this._prismaService.category.findFirst({
            where: { id },
        });

        if (!category) {
            throw new HttpException(MESSAGE.CATEGORY.NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        return category;
    }

    async update(id: number, category: UpdateCategoryDTO): Promise<Category> {

        // Verifica se a categoria existe, caso não exista, a própria função irá lançar uma HttpException.
        await this.findById(id);

        return await this._prismaService.category.update({
            data: category,
            where: { id },
        });
    }

    async delete(id: number) {

        // Verifica se a categoria existe, caso não exista, a própria função irá lançar uma HttpException.
        await this.findById(id);

        return this._prismaService.category.delete({
            where: { id }
        });
    }

    async getTotal() {
        return await this._prismaService.category.count();
    }
}
