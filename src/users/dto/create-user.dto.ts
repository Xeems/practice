import { ApiParam, ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    family_name: string;

    @ApiProperty()
    first_name: string;

    @ApiProperty()
    middle_name?: string | null;

    @ApiProperty()
    login: string;
    
    @ApiProperty()
    password: string;
}
