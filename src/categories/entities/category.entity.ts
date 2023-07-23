import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, OneToMany, Generated } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger/dist"
import { Catalog } from 'src/catalog/entities/catalog.entity';

@Entity()
export class Category {
    @ApiProperty()
    @PrimaryColumn()
    @PrimaryGeneratedColumn()
    @Generated()
    id: number

    @ApiProperty()
    @Column()
    name: string;

    @OneToMany  ((product) => Catalog, (product) => product.category_id)
    products: Catalog[]
}

