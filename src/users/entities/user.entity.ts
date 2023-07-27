import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger/dist"
import { Chat } from 'src/chat/entities/chat.entity';

@Entity()
export class User {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({
        unique: true
    })
    email: string

    @ApiProperty()
    @Column()
    password: string

    @ApiProperty()
    @JoinColumn()
    @OneToOne(() => Chat)
    chat: Chat

    @ApiProperty()
    @Column( {default: false} )
    is_admin: boolean
}