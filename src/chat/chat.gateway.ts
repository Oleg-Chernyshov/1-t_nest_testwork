import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket} from '@nestjs/websockets';
import { UsePipes } from '@nestjs/common/decorators';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { Chat } from './entities/chat.entity';
import { ApiTags, ApiResponse } from '@nestjs/swagger/dist/decorators'; 
import { JoiValidationPipe } from '../pipes/ValidationPipe'; 
import { CreateChatScheme } from './dto/create-chat.dto';
import { Server, Socket } from 'socket.io';
import { MessageService } from 'src/message/message.service';

@ApiTags("Chat")
@WebSocketGateway({ cors: '*:*' })
export class ChatGateway {

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected ${client.handshake.auth.cur_author}`);
  }

  constructor(private readonly chatService: ChatService, 
    private messageService: MessageService) {}

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

  @ApiResponse( { status:200 ,description:'Получен один чат', type: Chat })
  @SubscribeMessage('leaveChat')
  leaveChat(@MessageBody() id: any, @ConnectedSocket() client: Socket) {
    this.server.in(client.id).socketsLeave(String(id.id))
  }

  @ApiResponse( { status:200 ,description:'Получен один чат', type: Chat })
  @SubscribeMessage('EnterChat')
  async enterChat(@MessageBody() id: any,  @ConnectedSocket() client: Socket) {
    this.server.in(client.id).socketsJoin(String(id.id))
    const messages = await this.messageService.findAll(id) 
    return { event: "findAllMessage", data: messages}
  }
}
