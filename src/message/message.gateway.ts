import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { UseGuards, UsePipes } from '@nestjs/common/decorators';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiResponse } from '@nestjs/swagger/dist/decorators'; 
import { JoiValidationPipe } from 'src/pipes/ValidationPipe';
import { CreateMessageScheme } from './dto/create-message.dto';
import { UpdateMessageScheme   } from './dto/update-message.dto';
import { Socket, Server } from 'socket.io';

@ApiTags("Message")
@WebSocketGateway({ cors: '*:*' })
export class MessageGateway {
  constructor(private readonly messageService: MessageService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected ${client.handshake.auth.cur_author}`);
  }


  @UsePipes(new JoiValidationPipe(CreateMessageScheme))
  @ApiResponse( { status:201 ,description:'Сообщение создано', type: Message })
  @SubscribeMessage('createMessage')
  create(@MessageBody() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @ApiResponse( { status:200 ,description:'Получены все сообщения', type: [Message] })
  @SubscribeMessage('findAllMessage')
  async findAll() {
    const messages = await this.messageService.findAll() 
    return { event: "findAllMessage", data: messages}
  }
}
