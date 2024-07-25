import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { MESSAGE } from 'src/shared/messages';

@Injectable()
export class UserService {
    constructor(private _prismaService: PrismaService) { }

    async findAll(): Promise<User[]> {
        return this._prismaService.user.findMany();
    }

    async findById(id: number): Promise<User> {

        const user = this._prismaService.user.findFirst({
            where: {
                id,
            },
        });

        if (!user) throw new HttpException(MESSAGE.USER.NOT_FOUND, HttpStatus.NOT_FOUND);

        return user;
    }
}
