import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { CreateUserDTO } from 'src/shared/dtos/input/CreateUserDTO';
import { Roles } from 'src/shared/enum/roles';
import { HandleError } from 'src/shared/errors/handleError';
import { IPaginationQuery } from 'src/shared/interfaces/IPaginationQuery';
import { MESSAGE } from 'src/shared/messages';

@Injectable()
export class UserService {
    constructor(private _prismaService: PrismaService) { }

    async create(userDTO: CreateUserDTO) {

        const roles = Object.values(Roles);

        if (!roles.includes(userDTO.role)) {
            throw new HttpException(MESSAGE.USER.ROLE_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        const emailAlreadyExists = await this._prismaService.user.findFirst({
            where: {
                email: userDTO.email,
            },
        });

        if (emailAlreadyExists) {
            throw new HttpException(MESSAGE.USER.EMAIL_ALREADY_EXISTS, HttpStatus.CONFLICT);
        }

        const saltRounds = 10;

        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(userDTO.password, salt);

        userDTO.password = hash;

        const user = await this._prismaService.user.create({
            data: {
                name: userDTO.name,
                email: userDTO.email,
                password: userDTO.password,
                role: userDTO.role
            },
        });

        delete user.password;

        return user;
    }

    async findAll(query: IPaginationQuery): Promise<Omit<User, 'password'>[]> {

        const { skip, take } = query;

        return await this._prismaService.user.findMany({
            take: +take,
            skip: +skip,
            select: {
                id: true,
                name: true,
                email: true,
                password: false,
                role: true,
                created_at: true,
                updated_at: true,
            }
        });
    }

    async findAllByFilters(query: IPaginationQuery, filters: any) {
        const { skip, take } = query;

        return await this._prismaService.user.findMany({
            take: +take,
            skip: +skip,
            select: {
                id: true,
                name: true,
                email: true,
                password: false,
                role: true,
                created_at: true,
                updated_at: true,
            }
        });
    }

    async findById(id: number): Promise<Omit<User, 'password'>> {

        const user = await this._prismaService.user.findFirst({
            where: {
                id,
            },
        });

        if (!user) throw new HttpException(MESSAGE.USER.NOT_FOUND, HttpStatus.NOT_FOUND);

        delete user.password;

        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this._prismaService.user.findFirst({
            where: {
                email,
            },
        });

        if (!user) throw new HttpException(MESSAGE.USER.NOT_FOUND, HttpStatus.NOT_FOUND);

        return user;
    }

    async delete(id: number): Promise<Omit<User, 'password'>> {
        // Verifica se o usuário existe, caso não, a função irá lançar uma HttpException.
        await this.findById(id);

        // Deleta o usuário e retorna os dados do mesmo.
        const user = await this._prismaService.user.delete({
            where: {
                id,
            },
        });

        delete user.password;

        return user;
    }

    async getTotal() {
        return await this._prismaService.user.count();
    }
}
