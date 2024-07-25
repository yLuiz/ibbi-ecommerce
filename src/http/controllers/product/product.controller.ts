import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Product } from '@prisma/client';
import { multerConfig } from 'src/config/multer';
import { ProductService } from 'src/http/services/product/product.service';
import { CreateProductDTO } from 'src/shared/dtos/input/CreateProductDTO';
import { UpdateProductDTO } from 'src/shared/dtos/input/UpdateProductDTO';
import { UploadProductImageDTO } from 'src/shared/dtos/input/UploadProductImageDTO';
import { IResponseEntity } from 'src/shared/dtos/output/IResponseEntity';
import { HandleError } from 'src/shared/errors/handleError';
import { IPaginationQuery } from 'src/shared/interfaces/IPaginationQuery';
import { MESSAGE } from 'src/shared/messages';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { FileService } from 'src/http/services/file/file.service';
import { IProductFilters } from 'src/shared/interfaces/IProductFilters';
import { filter } from 'rxjs';


@ApiTags('Product')
@Controller('product')
export class ProductController {

    constructor(private _productService: ProductService, private _fileService: FileService) { }

    @Post()
    @ApiCreatedResponse({ description: 'Create a new product.', })
    async create(@Body() payload: CreateProductDTO): Promise<IResponseEntity<Product>> {
        try {
            const content = await this._productService.create(payload);

            return {
                content,
                message: MESSAGE.PRODUCT.CREATE
            } as IResponseEntity<Product>;
        }
        catch (error) {
            throw new HandleError(error);
        }
    }

    @Get()
    @ApiOkResponse({ description: 'Get All Products with pagination ' })
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
    @ApiQuery({
        name: 'name',
        type: String,
        required: false,
        description: 'Product name',
    })
    @ApiQuery({
        name: 'description',
        type: String,
        required: false,
        description: 'Product description',
    })
    @ApiQuery({
        name: 'categories',
        type: String,
        required: false,
        description: 'Categories ID, input like: 1,2,3,50...',
    })
    async getAll(@Query() query: IPaginationQuery, @Query() filters: IProductFilters): Promise<IResponseEntity<Product[]>> {
        try {
            const { skip, take } = query;

            if (!skip || !take) {
                query = { skip: 0, take: 10 }
            }

            if (Object.keys(filters).length > 0) {
                const products = await this._productService.findAllByFilters(query, filters);
                const total = await this._productService.getTotal();

                return {
                    content: products,
                    message: MESSAGE.SERVER.OK,
                    total,
                } as IResponseEntity<Product[]>;
            }

            const products = await this._productService.findAll(query);
            const total = await this._productService.getTotal();
            return {
                content: products,
                message: MESSAGE.SERVER.OK,
                total,
            } as IResponseEntity<Product[]>;
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
        description: 'Product ID',
    })
    async getOne(@Param('id') id: number): Promise<IResponseEntity<Product>> {

        const isNotValidIdParameter = !id || isNaN(+id);
        try {
            if (isNotValidIdParameter) throw new HttpException(MESSAGE.HTTP_PARAMS.ID_SHOULD_BE_NUMBER, HttpStatus.BAD_REQUEST);
            const content = await this._productService.findById(+id);
            return {
                content,
                message: MESSAGE.SERVER.OK,
            } as IResponseEntity<Product>;

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
        description: 'Product ID',
    })
    async update(@Param('id') id: number, @Body() productDTO: UpdateProductDTO): Promise<IResponseEntity<Product>> {
        try {
            const content = await this._productService.update(+id, productDTO);
            return {
                content,
                message: MESSAGE.PRODUCT.UPDATE,
            } as IResponseEntity<Product>
        }
        catch (error) {
            throw new HandleError(error);
        }
    }

    @ApiConsumes('multipart/form-data')
    @Patch(':id')
    @UseInterceptors(FileInterceptor('image', multerConfig))
    async uploadProductImage(@Param('id') id: number, @Body() body: UploadProductImageDTO, @UploadedFile() image: Express.Multer.File) {


        const { filename } = image;
        const productUpdated = await this._productService.updatePathImage(+id, filename)
        // fs.unlinkSync(path.join(__dirname, 'tmp', '..', '..', '..', '..', '..', 'tmp', filename));

        return {
            id,
            path_name: productUpdated.path_image
        };
    }

    @Delete(':id')
    @ApiParam({
        name: 'id',
        type: Number,
        required: true,
        description: 'Product ID',
    })
    async delete(@Param('id') id: number): Promise<IResponseEntity<Product>> {
        try {
            const content = await this._productService.delete(+id);
            // const content = await this._productService.findById(+id);
            const filename = content.path_image.split('/file/')[1];

            const isRemovedFile = this._fileService.deleteFileByFilenameNoResopnse(filename);

            if (!isRemovedFile) console.error('File not deleted');

            return {
                content,
                message: MESSAGE.PRODUCT.DELETE,
            } as IResponseEntity<Product>;
        }
        catch (error) {
            throw new HandleError(error);
        }

    }
}
