import { ApiProperty } from "@nestjs/swagger/dist"
import { Message } from "src/message/entities/message.entity"
import * as joi from 'joi'

export class CreateChatDto {

    @ApiProperty()
    name: string

    @ApiProperty()
    member_id: string

    @ApiProperty()
    messages: Message[]
}

export const CreateChatScheme = joi.object({
    name: joi.string().required(),
    member_id: joi.string().required(),
    messages: joi.array()
})
