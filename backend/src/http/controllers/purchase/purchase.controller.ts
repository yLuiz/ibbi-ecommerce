import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Purchase } from '@prisma/client';
import { PurchaseService } from 'src/http/services/purchase/purchase.service';
import { CreatePurchaseDTO } from 'src/shared/dtos/input/CreatePurchaseDTO';
import { IResponseEntity } from 'src/shared/dtos/output/IResponseEntity';
import { HandleError } from 'src/shared/errors/handleError';
import { IPaginationQuery } from 'src/shared/interfaces/IPaginationQuery';
import { IPurchaseFilter } from 'src/shared/interfaces/IPurchaseFilter';
import { MESSAGE } from 'src/shared/messages';

@ApiTags('Purchase')
@Controller('purchase')
export class PurchaseController {

    constructor(
        private _purchaseService: PurchaseService
    ) { }


    @Post()
    @ApiCreatedResponse({ description: 'Create a new purchase.', })
    async create(@Body() purchaseDTO: CreatePurchaseDTO) {
        return await this._purchaseService.create(purchaseDTO);
    }

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
        name: 'order',
        type: String,
        required: false,
        example: 'DESC',
        description: 'Number of items to skip',
    })
    @ApiQuery({
        name: 'client',
        type: Number,
        required: false,
        description: 'Client id relation to purchase',
    })
    @ApiQuery({
        name: 'seller',
        type: Number,
        required: false,
        description: 'Seller id relation to purchase',
    })
    @ApiQuery({
        name: 'product',
        type: Number,
        required: false,
        description: 'Product id relation to purchase',
    })
    @Get()
    async findAll(@Query() query: IPaginationQuery, @Query() filters?: IPurchaseFilter): Promise<IResponseEntity<Purchase[]>> {
        try {
            const { skip, take, order } = query;
            

            if (!skip || !take) {
                query = { ...query, skip: 0, take: 10 }
            }

            if (!order || !['desc', 'asc'].includes(order.toLowerCase())) {
                query.order = 'desc';
            }
            

            if (Object.keys(filters).length > 0) {
                const purchases = await this._purchaseService.findAllByFilters(query, filters);

                return {
                    content: purchases.data,
                    message: [MESSAGE.SERVER.OK],
                    total: purchases.total,
                } as IResponseEntity<Purchase[]>;
            }

            const purchases = await this._purchaseService.findAll(query);

            return {
                content: purchases.data,
                message: [MESSAGE.SERVER.OK],
                total: purchases.total,
            } as IResponseEntity<Purchase[]>;
        }
        catch (error) {
            throw new HandleError(error);
        }
    }

    @Get(':id')
    @ApiOkResponse({ description: 'Get Purchase by id ' })
    @ApiParam({
        name: 'id',
        type: Number,
        required: true,
        description: 'Purchase ID',
    })
    async findById(@Param('id') id: number): Promise<IResponseEntity<Purchase>> {
        try {

            if (isNaN(+id) || !id) {
                throw new HttpException(MESSAGE.HTTP_PARAMS.ID_SHOULD_BE_NUMBER, HttpStatus.BAD_REQUEST);
            }

            const purchase = await this._purchaseService.findById(+id);

            return {
                content: purchase,
                message: [MESSAGE.SERVER.OK],
            } as IResponseEntity<Purchase>;
        }
        catch (error) {
            throw new HandleError(error);
        }
    }

    @Delete(':id')
    @ApiOkResponse({ description: 'Delete Purchase by id ' })
    @ApiParam({
        name: 'id',
        type: Number,
        required: true,
        description: 'Purchase ID',
    })
    async delete(@Param() id: number): Promise<Purchase> {

        try {
            if (isNaN(+id) || !id) {
                throw new HttpException(MESSAGE.HTTP_PARAMS.ID_SHOULD_BE_NUMBER, HttpStatus.BAD_REQUEST);
            }
    
            return this._purchaseService.delete(id);
        }
        catch (error) {
            throw new HandleError(error);
        }
    }
}
