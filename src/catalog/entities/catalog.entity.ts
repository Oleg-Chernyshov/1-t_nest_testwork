import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, ManyToMany  } from 'typeorm';
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
    @Column()
    @ManyToOne((type) => Category, (category) => category.id, {cascade: true, onDelete: "CASCADE"})
    @JoinColumn({  name: "category_id" })
    category_id: Category;
}
