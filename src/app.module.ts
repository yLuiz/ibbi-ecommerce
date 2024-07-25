import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { HttpModule } from './http/http.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [HttpModule, DbModule],
  controllers: [AppController,],
  providers: [AppService,],
})
export class AppModule { }
