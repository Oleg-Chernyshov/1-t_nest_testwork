import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger/dist"

@Entity()
export class Message {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    message: string

    @ApiProperty()
    @Column()
    author_id: string
}
