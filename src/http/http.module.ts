import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { CategoryController } from './controllers/category/category.controller';
import { ProductController } from './controllers/product/product.controller';
import { CategoryService } from './services/category/category.service';
import { ProductService } from './services/product/product.service';
import { FileController } from './controllers/file/file.controller';
import { FileService } from './services/file/file.service';

@Module({
  imports: [DbModule],
  providers: [CategoryService, ProductService, FileService],
  controllers: [CategoryController, ProductController, FileController]
})
export class HttpModule { }
