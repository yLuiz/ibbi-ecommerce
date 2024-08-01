import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { SalesGateway } from 'src/gateway/sales.gateway';
import { CategoryController } from './controllers/category/category.controller';
import { FileController } from './controllers/file/file.controller';
import { ProductController } from './controllers/product/product.controller';
import { PurchaseController } from './controllers/purchase/purchase.controller';
import { UserController } from './controllers/user/user.controller';
import { CategoryService } from './services/category/category.service';
import { FileService } from './services/file/file.service';
import { ProductService } from './services/product/product.service';
import { PurchaseService } from './services/purchase/purchase.service';
import { UserService } from './services/user/user.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [DbModule, MulterModule.register({ dest: './upload' }),],
  providers: [CategoryService, ProductService, FileService, PurchaseService, UserService, SalesGateway],
  controllers: [UserController, CategoryController, ProductController, PurchaseController, FileController],
  exports: [UserService]
})
export class HttpModule { }
