import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogModule } from './catalog/catalog.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [CatalogModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
