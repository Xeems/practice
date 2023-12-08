export class User {
    user_id?: number;
    family_name: string;
    first_name: string;
    middle_name?: string;
    login: string;
    password?: string;
    user_role: UserRole 
}

export enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN"
}
