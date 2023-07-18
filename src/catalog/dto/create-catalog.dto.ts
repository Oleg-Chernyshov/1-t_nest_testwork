import { Category } from "src/categories/entities/category.entity"

export class CreateCatalogDto {
    name: string
    cost: number
    category_id: Category
}
