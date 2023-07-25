import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
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

@ApiTags("Message")
@WebSocketGateway()
export class MessageGateway {
  constructor(private readonly messageService: MessageService) {}

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new JoiValidationPipe(CreateMessageScheme))
  @ApiResponse( { status:201 ,description:'Сообщение создано', type: Message })
  @SubscribeMessage('createMessage')
  create(@MessageBody() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiResponse( { status:200 ,description:'Получены все сообщения', type: [Message] })
  @SubscribeMessage('findAllMessage')
  findAll() {
    return this.messageService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiResponse( { status:200 ,description:'Получены одно сообщение', type: Message })
  @SubscribeMessage('findOneMessage')
  findOne(@MessageBody() id: number) {
    return this.messageService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiResponse( { status:200 ,description:'Обновлено сообщение', type: Message })
  @SubscribeMessage('updateMessage')
  update(@MessageBody() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(updateMessageDto.id, updateMessageDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiResponse( { status:201 ,description:'Товар удален', type: Message })
  @SubscribeMessage('removeMessage')
  remove(@MessageBody() id: number) {
    return this.messageService.remove(id);
  }
}
