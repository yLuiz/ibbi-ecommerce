import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserService } from 'src/http/services/user/user.service';
import { CreateUserDTO } from 'src/shared/dtos/input/CreateUserDTO';
import { IResponseEntity } from 'src/shared/dtos/output/IResponseEntity';
import { HandleError } from 'src/shared/errors/handleError';
import { IPaginationQuery } from 'src/shared/interfaces/IPaginationQuery';
import { IUserFilter } from 'src/shared/interfaces/IUserFilter';
import { MESSAGE } from 'src/shared/messages';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private _userService: UserService) { }

    @Post()
    async createUser(@Body() userDTO: CreateUserDTO) {
        try {
            return await this._userService.create(userDTO);
        }
        catch (error) {
            throw new HandleError(error);
        }
    }

    @Get()
    @ApiOkResponse({ description: 'Get All Users with pagination ' })
    @ApiQuery({
        name: 'take',
        type: Number,
        required: false,
        description: 'Number of items to return per page',
    })
    @ApiQuery({
        name: 'skip',
        type: Number,
        required: false,
        description: 'Number of items to skip',
    })
    @ApiQuery({
        name: 'name',
        type: String,
        required: false,
        description: 'User name',
    })
    @ApiQuery({
        name: 'role',
        type: Number,
        required: false,
        description: 'User role',
    })
    async findAll(@Query() query: IPaginationQuery, @Query() filters?: IUserFilter): Promise<IResponseEntity<User[]>> {

        try {
            const { skip, take } = query;

            if (!skip || !take) {
                query = { skip: 0, take: 10 }
            }

            if (Object.keys(filters).length > 0) {
                const users = await this._userService.findAllByFilters(query, filters);

                return {
                    content: users.data,
                    message: MESSAGE.SERVER.OK,
                    total: users.total,
                } as IResponseEntity<User[]>;
            }

            const users = await this._userService.findAll(query);

            return {
                content: users.data,
                message: MESSAGE.SERVER.OK,
                total: users.total,
            } as IResponseEntity<User[]>;
        }
        catch (error) {
            throw new HandleError(error);
        }
    }
}
