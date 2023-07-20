import { Controller, Request, Post, Body, UsePipes  } from '@nestjs/common';
import { CreateUserDto, CreateUserSchema  } from './users/dto/create-user.dto';
import { UsersService } from './users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger/dist/decorators'; 
import { User } from './users/entities/user.entity';
import { JoiValidationPipe } from './pipes/ValidationPipe'; 
import { log } from 'console';

@ApiTags('Authorization')
@Controller()
export class AppController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService
  ) {}


  @Post('auth/register')
  @UsePipes(new JoiValidationPipe(CreateUserSchema))
  @ApiResponse( { status:201 ,description:'Регистрация прошла успешно', type: User })
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }
  
  @UsePipes(new JoiValidationPipe(CreateUserSchema))
  @ApiResponse( { status:201 ,description:'Вход успешен', type: User })
  @Post('auth/login')
  async login(@Request() req) {
    
    return  this.authService.login(req.body.user);
  }
}

