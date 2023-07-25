import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger/dist"
import { Message } from 'src/message/entities/message.entity';

@Entity()
export class Chat {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    name: string

    @ApiProperty()
    @Column()
    member_id: string

    @ApiProperty()
    @ManyToMany(() => Message)
    @JoinTable()
    messages: Message[]
}
