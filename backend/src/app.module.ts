import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { SalesGateway } from './gateway/sales.gateway';
import { HttpModule } from './http/http.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, HttpModule, DbModule],
  controllers: [],
  providers: [SalesGateway],
})
export class AppModule { }
