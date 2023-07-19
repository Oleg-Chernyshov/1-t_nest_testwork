import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn  } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { ApiProperty } from "@nestjs/swagger/dist"

@Entity()
export class Catalog {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column()
    name: string

    @ApiProperty()
    @Column()
    cost: number

    @ApiProperty()
    @OneToOne((type) => Category)
    @JoinColumn({  name: "id" })
    category_id: Category;
}
