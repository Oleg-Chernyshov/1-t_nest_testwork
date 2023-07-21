import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import * as joi from 'joi'

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiProperty()
  name: string
}

export const UpdateCategoryScheme = joi.object({
    name: joi.string().required(),
  })