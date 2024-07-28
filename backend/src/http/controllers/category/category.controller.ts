import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Category } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { CategoryService } from 'src/http/services/category/category.service';
import { CreateCategoryDTO } from 'src/shared/dtos/input/CreateCategoryDTO';
import { UpdateCategoryDTO } from 'src/shared/dtos/input/UpdateCategoryDTO';
import { IResponseEntity } from 'src/shared/dtos/output/IResponseEntity';
import { HandleError } from 'src/shared/errors/handleError';
import { IPaginationQuery } from 'src/shared/interfaces/IPaginationQuery';
import { MESSAGE } from 'src/shared/messages';


@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Category')
@Controller('category')
export class CategoryController {
    constructor(private _categoryService: CategoryService) { }

    @Post()
    @ApiCreatedResponse({ description: 'Create a new category.', })
    async create(@Body() payload: CreateCategoryDTO): Promise<IResponseEntity<Category>> {

        try {
            const content = await this._categoryService.create(payload);

            return {
                content,
                message: [MESSAGE.CATEGORY.CREATE]
            } as IResponseEntity<Category>;
        }
        catch (error) {
            throw new HandleError(error);
        }
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
    async findAll(@Query() query: IPaginationQuery): Promise<IResponseEntity<Category[]>> {

        try {
            const { skip, take } = query;

            if (!skip || !take) {
                query = { skip: 0, take: 10 }
            }

            const categories = await this._categoryService.findAll(query);
            return {
                content: categories.data,
                message: [MESSAGE.SERVER.OK],
                total: categories.total,
            } as IResponseEntity<Category[]>;
        }
        catch (error) {
            throw new HandleError(error);
        }
    }

    @Get(':id')
    @ApiParam({
        name: 'id',
        type: Number,
        required: true,
        description: 'Category ID',
    })

    async findById(@Param('id') id: number): Promise<IResponseEntity<Category>> {

        const isNotValidIdParameter = !id || isNaN(+id);

        try {
            if (isNotValidIdParameter) throw new HttpException(MESSAGE.HTTP_PARAMS.ID_SHOULD_BE_NUMBER, HttpStatus.BAD_REQUEST);
            const content = await this._categoryService.findById(+id);
            return {
                content,
                message: [MESSAGE.SERVER.OK],
            } as IResponseEntity<Category>;

        }
        catch (error) {
            throw new HandleError(error);
        }
    }

    @Put(':id')
    @ApiParam({
        name: 'id',
        type: Number,
        required: true,
        description: 'Category ID',
    })
    async update(@Param('id') id: number, @Body() categoryDTO: UpdateCategoryDTO): Promise<IResponseEntity<Category>> {
        try {
            const content = await this._categoryService.update(+id, categoryDTO);
            return {
                content,
                message: [MESSAGE.CATEGORY.UPDATE],
            } as IResponseEntity<Category>
        }
        catch (error) {
            throw new HandleError(error);
        }
    }

    @Delete(':id')
    @ApiParam({
        name: 'id',
        type: Number,
        required: true,
        description: 'Category ID',
    })
    async delete(@Param('id') id: number): Promise<IResponseEntity<Category>> {
        try {
            const content = await this._categoryService.delete(+id);
            return {
                content,
                message: [MESSAGE.CATEGORY.DELETE],
            } as IResponseEntity<Category>;
        }
        catch (error) {
            throw new HandleError(error);
        }

    }

}
