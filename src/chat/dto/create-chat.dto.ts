import { ApiProperty } from "@nestjs/swagger/dist"
import { Message } from "src/message/entities/message.entity"
import * as joi from 'joi'

export class CreateChatDto {

    @ApiProperty()
    messages: Message[]
}

export const CreateChatScheme = joi.object({
    messages: joi.array()
})
