import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private repository: Repository<Message>
  ) {}

  create(createMessageDto: CreateMessageDto) {
    return this.repository.save(createMessageDto);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return this.repository.save({...updateMessageDto, id})
  }

  async remove(id: number) {
    return await this.repository.delete(id);
  }
}
