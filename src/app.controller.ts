import { Controller, Request, Post, Body, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UsersService } from './users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';  

@Controller()
export class AppController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService
  ) {}


  @Post('auth/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
