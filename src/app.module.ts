import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from './http/http.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [HttpModule, DbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
