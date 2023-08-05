import { Category } from "src/categories/entities/category.entity"
import { ApiProperty } from "@nestjs/swagger/dist"
import * as joi from 'joi'

export class CreateCatalogDto {

    @ApiProperty()
    name: string

    @ApiProperty()
    file_url: string

    @ApiProperty()
    cost: number

    @ApiProperty()
    category_id: Category
}

export const CreateProductScheme = joi.object({
    name: joi.string().required(),
    cost: joi.number().required(),
    category_id: joi.number().required()
  })
