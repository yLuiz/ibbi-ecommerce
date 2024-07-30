import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { HandleError } from 'src/shared/errors/handleError';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        try {
            await this.$connect();
        }
        catch (error) {
            throw new HandleError(error.message);
        }
    }
}
