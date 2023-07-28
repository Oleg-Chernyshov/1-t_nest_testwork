import { ApiProperty } from "@nestjs/swagger/dist"
import * as joi from 'joi'
import { Chat } from "src/chat/entities/chat.entity"

export class CreateMessageDto {

    @ApiProperty()
    message: string

    @ApiProperty()
    author_id: string

    @ApiProperty()
    chat_id: Chat
}

export const CreateMessageScheme = joi.object({
    message: joi.string().required(),
    author_id: joi.string().required(),
    chat_id: joi.number().required()
})

