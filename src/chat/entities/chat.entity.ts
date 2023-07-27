import { Entity, Column, PrimaryColumn, Generated, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger/dist"
import { Message } from 'src/message/entities/message.entity';

@Entity()
export class Chat {
    @ApiProperty()
    @PrimaryColumn()
    @PrimaryGeneratedColumn()
    @Generated()
    id: number;

    @OneToMany  ((messages) => Message, (messages) => messages.chat_id)
    messages: Message[]
}
