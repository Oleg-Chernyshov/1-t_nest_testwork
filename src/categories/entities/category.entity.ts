import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger/dist"

@Entity()
export class Category {
    @ApiProperty()
    @PrimaryColumn()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column()
    name: string;
}
