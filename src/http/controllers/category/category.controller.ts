import { Body, Catch, Controller, Delete, Get, HttpException, Logger, Param, Post, Put, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Category } from '@prisma/client';
import { CategoryService } from 'src/http/services/category/category.service';
import { CreateCategoryDTO } from 'src/shared/dtos/input/CreateCategoryDTO';
import { UpdateCategoryDTO } from 'src/shared/dtos/input/UpdateCategoryDTO';

export interface ICategoryQuery {
    take: string;
    skip: string;
}

@ApiTags('Category')
@Controller('category')
export class CategoryController {
    constructor(private _categoryService: CategoryService) { }

    @Post()
    @ApiCreatedResponse({ description: 'Create a new category.', })
    async create(@Body() payload: CreateCategoryDTO): Promise<Category> {
        return await this._categoryService.create(payload);
    }

    @Get()
    @ApiOkResponse({ description: 'Get All Categories with pagination ' })
    @ApiQuery({
        name: 'take',
        type: Number,
        required: false,
        description: 'Number of items to return per page',
    })
    @ApiQuery({
        name: 'skip',
        type: Number,
        required: false,
        description: 'Number of items to skip',
    })
    async getAll(@Query() query: ICategoryQuery): Promise<Category[]> {
        return await this._categoryService.findAll(query);
    }

    @Get(':id')
    @ApiParam({
        name: 'id',
        type: String,
        required: true,
        description: 'Category ID',
    })

    async getOne(@Param('id') id: string): Promise<Category> {

        return await this._categoryService.findById(+id);

    }

    @Put(':id')
    @ApiParam({
        name: 'id',
        type: String,
        required: true,
        description: 'Category ID',
    })
    async update(@Param('id') id: string, @Body() categoryDTO: UpdateCategoryDTO) {
        return await this._categoryService.update(+id, categoryDTO);
    }

    @Delete(':id')
    @ApiParam({
        name: 'id',
        type: String,
        required: true,
        description: 'Category ID',
    })
    async delete(@Param('id') id: string) {
        return await this._categoryService.delete(+id);

    }

}
