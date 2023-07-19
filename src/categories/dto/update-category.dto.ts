import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import * as joi from 'joi'

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

export const UpdateCategoryScheme = joi.object({
    name: joi.string().required(),
  })