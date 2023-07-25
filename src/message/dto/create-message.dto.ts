import { ApiProperty } from "@nestjs/swagger/dist"
import * as joi from 'joi'

export class CreateMessageDto {

    @ApiProperty()
    message: string

    @ApiProperty()
    author_id: string
}

export const CreateMessageScheme = joi.object({
    message: joi.string().required(),
    author_id: joi.string().required()
})

