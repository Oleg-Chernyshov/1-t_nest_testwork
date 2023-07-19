import { ApiProperty } from "@nestjs/swagger/dist"
import * as joi from 'joi'

export class CreateUserDto {
    
    @ApiProperty()
    email: string

    @ApiProperty()
    password: string
}       

export const CreateUserSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().min(5)
  })