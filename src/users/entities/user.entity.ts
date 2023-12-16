export class User {
    userId?: number;
    familyName: string;
    firstName: string;
    middleName?: string;
    login: string;
    password?: string;
    roles: UserRole[] 
}

export enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN"
}
