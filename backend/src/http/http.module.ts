import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { CategoryController } from './controllers/category/category.controller';
import { ProductController } from './controllers/product/product.controller';
import { CategoryService } from './services/category/category.service';
import { ProductService } from './services/product/product.service';
import { FileController } from './controllers/file/file.controller';
import { FileService } from './services/file/file.service';
import { PurchaseController } from './controllers/purchase/purchase.controller';
import { PurchaseService } from './services/purchase/purchase.service';
import { UserService } from './services/user/user.service';
import { UserController } from './controllers/user/user.controller';
import { SalesGateway } from 'src/gateway/sales.gateway';

@Module({
  imports: [DbModule],
  providers: [CategoryService, ProductService, FileService, PurchaseService, UserService, SalesGateway],
  controllers: [UserController, CategoryController, ProductController, PurchaseController, FileController]
})
export class HttpModule { }
