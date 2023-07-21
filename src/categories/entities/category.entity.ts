import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, OneToMany, Generated } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger/dist"

@Entity()
export class Category {
    @ApiProperty()
    @PrimaryColumn()
    @PrimaryGeneratedColumn()
    @Generated()
    @OneToMany  ((type) => Category, (category) => category.id)
    id: number

    @ApiProperty()
    @Column()
    name: string;
}

