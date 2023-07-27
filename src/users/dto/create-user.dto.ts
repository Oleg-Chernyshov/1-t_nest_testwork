import { ApiProperty } from "@nestjs/swagger/dist"
import * as joi from 'joi'
import { Chat } from "src/chat/entities/chat.entity"

export class CreateUserDto {
    
    @ApiProperty()
    email: string

    @ApiProperty()
    password: string

    @ApiProperty()
    chat: Chat
}       

export const CreateUserSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().min(5)
  })