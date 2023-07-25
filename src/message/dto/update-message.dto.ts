
import * as joi from 'joi'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateMessageDto {

  @ApiProperty()
  id: number
  
  @ApiProperty()
  message: string

  @ApiProperty()
  author_id: string

}

export const UpdateMessageScheme = joi.object({
  id: joi.number().required(),
  message: joi.string(),
  author_id: joi.string()
})
