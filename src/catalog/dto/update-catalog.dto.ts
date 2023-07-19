import { PartialType } from '@nestjs/mapped-types';
import { CreateCatalogDto } from './create-catalog.dto';
import * as joi from 'joi'

export class UpdateCatalogDto extends PartialType(CreateCatalogDto) {}

export const UpdateProductScheme = joi.object({
    name: joi.string().required(),
    cost: joi.number().required(),
    category_id: joi.number().required()
  })
