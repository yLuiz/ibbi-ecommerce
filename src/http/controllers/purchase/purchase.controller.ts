import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { PurchaseService } from 'src/http/services/purchase/purchase.service';
import { CreatePurchaseDTO } from 'src/shared/dtos/input/CreatePurchaseDTO';

@ApiTags('Purchase')
@Controller('purchase')
export class PurchaseController {

    constructor(
        private _purchaseService: PurchaseService
    ) { }


    @Post()
    @ApiCreatedResponse({ description: 'Create a new purchase.', })
    async create(@Body() purchaseDTO: CreatePurchaseDTO) {

    }
}
