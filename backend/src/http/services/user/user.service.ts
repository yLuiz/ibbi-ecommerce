import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { CreateUserDTO } from 'src/shared/dtos/input/CreateUserDTO';
import { UpdateUserDTO } from 'src/shared/dtos/input/UpdateUserDTO';
import { Roles } from 'src/shared/enum/roles';
import { IPaginationData } from 'src/shared/interfaces/IPaginationData';
import { IPaginationQuery } from 'src/shared/interfaces/IPaginationQuery';
import { IUserFilter } from 'src/shared/interfaces/IUserFilter';
import { MESSAGE } from 'src/shared/messages';

@Injectable()
export class UserService {
    constructor(private _prismaService: PrismaService) { }

    async create(userDTO: CreateUserDTO) {


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
            },
        });

        delete user.password;

        return user;
    }

    async findAll(query: IPaginationQuery): Promise<IPaginationData<Omit<User, 'password'>[]>> {

        const { skip, take } = query;

        const offset: number | undefined = query.skip === 0 ? query.take : query.skip * query.take;

        const users = await this._prismaService.user.findMany({
            take: +take,
            skip: offset || 0,
            select: {
                id: true,
                name: true,
                email: true,
                password: false,
                created_at: true,
                updated_at: true,
            }
        });

        const total = await this._prismaService.user.count();

        return {
            data: users,
            total,
        };
    }

    async findAllByFilters(query: IPaginationQuery, filters: IUserFilter): Promise<IPaginationData<Omit<User, 'password'>[]>> {
        const { skip, take } = query;

        const { name } = filters;

        const whereFilters: Prisma.UserWhereInput = {
            name: {
                contains: name
            },
        }

        let realFilter: Prisma.UserWhereInput = {};
        Object.keys(filters).forEach(key => {
            realFilter = {
                ...realFilter,
                [key]: whereFilters[key]
            }
        });

        const offset: number | undefined = query.skip === 0 ? query.take : query.skip * query.take;

        const users = await this._prismaService.user.findMany({
            take: +take,
            skip: offset || 0,
            orderBy: {
                id: query.order.toLowerCase() as 'asc' | 'desc'
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: false,
                created_at: true,
                updated_at: true,
            },
            where: realFilter
        });

        const total = await this._prismaService.user.count({
            where: realFilter
        });

        return {
            data: users,
            total,
        };
    }

    async findById(id: number): Promise<Omit<User, 'password'>> {

        const user = await this._prismaService.user.findFirst({
            where: {
                id
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

    async update(id: number, userDTO: UpdateUserDTO): Promise<Omit<User, 'password'>> {
        // Verifica se o usuário existe, caso não, a função irá lançar uma HttpException.
        await this.findById(id);

        const userByEmail = userDTO?.email ? await this._prismaService.user.findFirst({
            where: {
                email: userDTO.email,
            }
        }) : undefined;

        if (userByEmail?.id !== id) throw new HttpException(MESSAGE.USER.EMAIL_ALREADY_EXISTS, HttpStatus.CONFLICT);


        if (userDTO.password?.length > 0) {
            const saltRounds = 10;

            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(userDTO.password, salt);

            userDTO.password = hash;
        }

        const updatedUser = await this._prismaService.user.update({
            where: {
                id,
            },
            data: userDTO,
        });

        delete updatedUser.password;

        return updatedUser;

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
}
