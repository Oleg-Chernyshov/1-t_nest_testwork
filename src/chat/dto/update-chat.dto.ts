import { ApiProperty } from '@nestjs/swagger';
import { Message } from 'src/message/entities/message.entity';
import * as joi from 'joi'

export class UpdateChatDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string

  @ApiProperty()
  member_id: string

  @ApiProperty()
  messages: Message[]
}

export const UpdateChatScheme = joi.object({
  id: joi.number().required(),
  name: joi.string(),
  member_id: joi.string(),
  messages: joi.array()
})