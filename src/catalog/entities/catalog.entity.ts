import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn  } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';

@Entity()
export class Catalog {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    cost: number

    @OneToOne((type) => Category)
    @JoinColumn({  name: "id" })
    category_id: Category;
}
