import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
    @PrimaryColumn()
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;
}
