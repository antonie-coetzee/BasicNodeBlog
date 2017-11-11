import {Get, Post, Route, Body, Query, Header, Path, SuccessResponse, Controller } from 'tsoa';

export interface User {
    id: number;
    email: string;
    name: Name;
    status?: status;
    phoneNumbers: string[];
}

export type status = 'Happy' | 'Sad';

export interface Name {
    first: string;
    last?: string;
}

export interface UserCreationRequest {
    email: string;
    name: Name;
    phoneNumbers: string[];
}

@Route('Users')
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
}