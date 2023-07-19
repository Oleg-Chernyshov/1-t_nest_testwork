import { ApiProperty } from "@nestjs/swagger/dist"
import * as joi from 'joi'

export class CreateCategoryDto {
    @ApiProperty()
    name: string
}

export const CreateCategoryScheme = joi.object({
    name: joi.string().required(),
  })
