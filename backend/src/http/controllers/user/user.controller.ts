import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserService } from 'src/http/services/user/user.service';
import { CreateUserDTO } from 'src/shared/dtos/input/CreateUserDTO';
import { UpdateUserDTO } from 'src/shared/dtos/input/UpdateUserDTO';
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
    @ApiOkResponse({ description: 'Create an user' })
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
    async findAll(@Query() query: IPaginationQuery, @Query() filters?: IUserFilter): Promise<IResponseEntity<User[]>> {

        try {
            const { skip, take, order } = query;

            if (!skip || !take) {
                query = { ...query, skip: 0, take: 10 }
            }

            if (!order || !['asc', 'desc'].includes(order.toLowerCase())) {
                query = {...query, order: 'desc' }
            }

            if (Object.keys(filters).length > 0) {
                const users = await this._userService.findAllByFilters(query, filters);

                return {
                    content: users.data,
                    message: [MESSAGE.SERVER.OK],
                    total: users.total,
                } as IResponseEntity<User[]>;
            }

            const users = await this._userService.findAll(query);

            return {
                content: users.data,
                message: [MESSAGE.SERVER.OK],
                total: users.total,
            } as IResponseEntity<User[]>;
        }
        catch (error) {
            throw new HandleError(error);
        }
    }

    @Get(':id')
    @ApiOkResponse({ description: 'Get User by id ' })
    @ApiParam({
        name: 'id',
        type: Number,
        required: false,
        description: 'User ID',
    })
    async findById(@Param('id') id: number): Promise<IResponseEntity<Omit<User, 'password'>>> {
        try {

            if (isNaN(+id) || !id) {
                throw new HttpException(MESSAGE.HTTP_PARAMS.ID_SHOULD_BE_NUMBER, HttpStatus.BAD_REQUEST);
            }

            const user = await this._userService.findById(+id);

            return {
                content: user,
                message: [MESSAGE.SERVER.OK],
            } as IResponseEntity<User>;
        }
        catch (error) {
            throw new HandleError(error);
        }

    }

    @Put(':id')
    @ApiOkResponse({ description: 'Update User by id ' })
    @ApiParam({
        name: 'id',
        type: Number,
        required: false,
        description: 'User ID',
    })
    async update(@Param('id') id: number, @Body() userDTO: UpdateUserDTO): Promise<IResponseEntity<Omit<User, 'password'>>> {
        try {

            if (isNaN(+id) || !id) {
                throw new HttpException(MESSAGE.HTTP_PARAMS.ID_SHOULD_BE_NUMBER, HttpStatus.BAD_REQUEST);
            }

            const updatedUser = await this._userService.update(+id, userDTO);

            return {
                content: updatedUser,
                message: [MESSAGE.USER.UPDATE],
            } as IResponseEntity<User>;

        }
        catch (error) {
            throw new HandleError(error);
        }
    }

    @Delete(':id')
    @ApiOkResponse({ description: 'Delete User by id ' })
    @ApiParam({
        name: 'id',
        type: Number,
        required: false,
        description: 'User ID',
    })
    async delete(@Param('id') id: number): Promise<IResponseEntity<Omit<User, 'password'>>> {
        try {

            if (isNaN(+id) || !id) {
                throw new HttpException(MESSAGE.HTTP_PARAMS.ID_SHOULD_BE_NUMBER, HttpStatus.BAD_REQUEST);
            }

            const deletedUser = await this._userService.delete(+id);

            return {
                content: deletedUser,
                message: [MESSAGE.USER.DELETE],
            } as IResponseEntity<User>;
        }
        catch (error) {
            throw new HandleError(error);
        }
    }
}
