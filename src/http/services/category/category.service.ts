import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { ICategoryQuery } from 'src/http/controllers/category/category.controller';
import { CreateCategoryDTO } from 'src/shared/dtos/input/CreateCategoryDTO';
import { UpdateCategoryDTO } from 'src/shared/dtos/input/UpdateCategoryDTO';
import MESSAGE from 'src/shared/messages';

@Injectable()
export class CategoryService {

    private messageLanguage: string;

    constructor(private _prismaService: PrismaService) {
        this.messageLanguage = process.env.LANGUAGE || 'en';
    }

    async create(category: CreateCategoryDTO): Promise<Category> {
        return await this._prismaService.category.create({ data: category });
    }

    async findAll(query: ICategoryQuery) {
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
            throw new HttpException(MESSAGE[this.messageLanguage].CATEGORY.NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        return category;

    }

    async update(id: number, category: UpdateCategoryDTO): Promise<Category> {
        return await this._prismaService.category.update({
            data: category,
            where: { id },
        });
    }

    async delete(id: number) {

        const category = await this.findById(id);
        if (!category) {
            throw new HttpException(MESSAGE[this.messageLanguage].CATEGORY.NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        return this._prismaService.category.delete({
            where: { id }
        });
    }
}
