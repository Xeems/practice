import { ApiParam, ApiProperty } from "@nestjs/swagger"

export class AuthenticateDto {
    @ApiProperty()
    login: string

    @ApiProperty()
    password: string
}
