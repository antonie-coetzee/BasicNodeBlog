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

export const IUsersControllerKey = "IUserController";

export interface IUsersController {
    getUser(id: number, name: string) : Promise<User>
    createUser(requestBody: UserCreationRequest): Promise<void>
    getPrivateUser(ID: number, authorization: string): Promise<User>
    getOtherUser(num: number): Promise<User>
}