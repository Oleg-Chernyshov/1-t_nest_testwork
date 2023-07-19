import { Category } from "src/categories/entities/category.entity"
import { ApiProperty } from "@nestjs/swagger/dist"

export class CreateCatalogDto {

    @ApiProperty()
    name: string

    @ApiProperty()
    cost: number

    @ApiProperty()
    category_id: Category
}
