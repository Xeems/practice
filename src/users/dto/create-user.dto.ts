import { ApiParam, ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    familyName: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    middleName?: string | null;

    @ApiProperty()
    login: string;
    
    @ApiProperty()
    password: string;

    @ApiProperty()
    user_role: string
}
