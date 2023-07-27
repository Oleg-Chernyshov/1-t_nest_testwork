import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer} from '@nestjs/websockets';
import { UseGuards, UsePipes } from '@nestjs/common/decorators';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiResponse } from '@nestjs/swagger/dist/decorators'; 
import { JoiValidationPipe } from '../pipes/ValidationPipe'; 
import { CreateChatScheme } from './dto/create-chat.dto';
import { UpdateChatScheme } from './dto/update-chat.dto';
import { Server } from 'socket.io';

@ApiTags("Chat")
@WebSocketGateway({ cors: '*:*' })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new JoiValidationPipe(CreateChatScheme))
  @ApiResponse( { status:201 ,description:'Чат создан', type: Chat })
  @SubscribeMessage('createChat')
  create(@MessageBody() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiResponse( { status:200 ,description:'Получены все чаты', type: [Chat] })
  @SubscribeMessage('findAllChat')
  findAll() {
    return this.chatService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiResponse( { status:200 ,description:'Получен один чат', type: Chat })
  @SubscribeMessage('findOneChat')
  findOne(@MessageBody() id: number) {
    return this.chatService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
 // @UsePipes(new JoiValidationPipe(UpdateChatScheme))
 //https://stackoverflow.com/questions/55818694/usepipesvalidationpipe-not-working-with-generics-abstract-controller
  @ApiResponse( { status:200 ,description:'Обновлен чат', type: Chat })
  @SubscribeMessage('updateChat')
  update(@MessageBody() updateChatDto: UpdateChatDto) {
    return this.chatService.update(updateChatDto.id, updateChatDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiResponse( { status:201 ,description:'Товар удален', type: Chat })
  @SubscribeMessage('removeChat')
  remove(@MessageBody() id: number) {
    return this.chatService.remove(id);
  }
}
