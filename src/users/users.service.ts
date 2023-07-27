import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatService } from 'src/chat/chat.service';
    
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    private chatService: ChatService
  ) { }

  async register(data: CreateUserDto) {
    const chat = await this.chatService.create({messages: []})
    const saltOrRounds = 10;
    data.password = await bcrypt.hash(data.password, saltOrRounds);
    data.chat = {id: chat.id, messages: []}
    return this.repository.save(data);
  }

  async login(data: CreateUserDto) {
    const user = await this.repository.findOneBy({ email: data.email });
    if (!user) {
      return false;
    }

    return await bcrypt.compare(data.password, user.password);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(email: string) {
    return this.repository.findOneBy({ email });
  }

  update(id: number, data: UpdateUserDto) {    
    return this.repository.save({...data, id});
  }
  async remove(id: number) {
    await this.repository.delete(id);
  }
}