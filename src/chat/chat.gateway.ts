import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayConnection} from '@nestjs/websockets';
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
import { Server, Socket } from 'socket.io';
import { log } from 'console';

@ApiTags("Chat")
@WebSocketGateway({ cors: '*:*' })
export class ChatGateway {

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected ${client.handshake.auth.cur_author}`);
  }

  constructor(private readonly chatService: ChatService) {}

  @UsePipes(new JoiValidationPipe(CreateChatScheme))
  @ApiResponse( { status:201 ,description:'Чат создан', type: Chat })
  @SubscribeMessage('createChat')
  create(@MessageBody() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @ApiResponse( { status:200 ,description:'Получены все чаты', type: [Chat] })
  @SubscribeMessage('findAllChat')
  async findAll() {
    const chats = await this.chatService.findAll()   
    return { event: "findAllChat", data: chats}
  }

  @ApiResponse( { status:200 ,description:'Получен один чат', type: Chat })
  @SubscribeMessage('findOneChat')
  findOne(@MessageBody() id: number) {
    return this.chatService.findOne(id);
  }
}
