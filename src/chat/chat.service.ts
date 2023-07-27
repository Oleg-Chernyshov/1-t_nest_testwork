import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private repository: Repository<Chat>
  ) {}

  create(createChatDto: CreateChatDto) {
    return this.repository.save(createChatDto);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return this.repository.save({...updateChatDto, id})
  }

  async remove(id: number) {
    return await this.repository.delete(id);
  }
}
