import { ApiProperty } from "@nestjs/swagger/dist"

export class CreateCategoryDto {
    @ApiProperty()
    name: string
}
