import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogModule } from './catalog/catalog.module';
import { CategoriesModule } from './categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './categories/entities/category.entity';
import { Catalog } from './catalog/entities/catalog.entity';
import { DataSource } from 'typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { Chat } from './chat/entities/chat.entity';
import { Message } from './message/entities/message.entity';

@Module({
  imports: [CatalogModule, CategoriesModule, UsersModule, AuthModule,     
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: '1t_shop',
    entities: [Category, Catalog, User, Chat, Message],
    synchronize: true,
  }), ChatModule, MessageModule,],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  constructor(private dataSource: DataSource) {}
}
