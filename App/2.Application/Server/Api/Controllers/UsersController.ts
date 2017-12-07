import { injectable, inject, interfaces} from "inversify";
import {Get, Post, Route, Body, Query, Header, Path, SuccessResponse, Controller } from 'tsoa';

import {Name, User, UserCreationRequest} from './IUsersController'

@Route('Users')
@injectable()
export class UsersController extends Controller {
    
    @Get('{id}')
    public async getUser(id: number, @Query() name: string): Promise<User> {
        return null;
    }

    @SuccessResponse('201', 'Created') // Custom success response
    @Post()
    public async createUser(@Body() requestBody: UserCreationRequest): Promise<void> {
        this.setStatus(201); // set return status 201
        return Promise.resolve();
    }

    @Get('{id}')
    public async getPrivateUser(@Path('id') ID: number, @Header('Authorization') authorization: string): Promise<User> {
        return null;
    }

    @Get('other/{num}')
    public async getOtherUser(@Path('num') num: number): Promise<User> {
        return null;
    }
}