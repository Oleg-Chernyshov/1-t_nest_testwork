import { ApiProperty } from "@nestjs/swagger/dist"

export class CreateUserDto {
    
    @ApiProperty()
    email: string

    @ApiProperty()
    password: string
}       