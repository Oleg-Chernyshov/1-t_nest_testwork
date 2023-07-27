import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger/dist"
import { Chat } from 'src/chat/entities/chat.entity';

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


    @ApiProperty()
    @ManyToOne((type) => Chat, (chat) => chat.id, {cascade: true, onDelete: "CASCADE"})
    @JoinColumn({  name: "chat_id" })
    chat_id: Chat;
}
