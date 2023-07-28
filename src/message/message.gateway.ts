import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
import { ApiTags, ApiResponse } from '@nestjs/swagger/dist/decorators'; 
import { Socket, Server } from 'socket.io';

@ApiTags("Message")
@WebSocketGateway({ cors: '*:*' })
export class MessageGateway {
  constructor(private readonly messageService: MessageService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    this.server.in(client.id).socketsJoin(client.handshake.auth.cur_author)
  }


  @ApiResponse( { status:201 ,description:'Сообщение создано', type: Message })
  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto, @ConnectedSocket() client: Socket) {
    let message =  await this.messageService.create(createMessageDto);
    console.log( client);
    
    this.server.to(String(createMessageDto.chat_id)).emit('createMessage', message)
  }

  @ApiResponse( { status:200 ,description:'Получены все сообщения', type: [Message] })
  @SubscribeMessage('findAllMessage')
  async findAll(@MessageBody() id) {
    const messages = await this.messageService.findAll(Number(id))    
    return { event: "findAllMessage", data: messages}
  }
}
