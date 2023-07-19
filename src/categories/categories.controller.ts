import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto, UpdateCategoryScheme } from './dto/update-category.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiResponse } from '@nestjs/swagger/dist/decorators'; 
import { Category } from './entities/category.entity';
import { JoiValidationPipe } from '../pipes/ValidationPipe'; 
import { CreateCategoryScheme } from './dto/create-category.dto';

@ApiTags("Category")
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new JoiValidationPipe(CreateCategoryScheme))
  @ApiResponse( { status:201 ,description:'Категория добавлена', type: Category })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiResponse( { status:200 ,description:'Получены все категории', type: [Category] })
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiResponse( { status:200 ,description:'Получены одна категория', type: Category })
  @Get(':id' )
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.categoriesService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new JoiValidationPipe(UpdateCategoryScheme))
  @Patch(':id')
  @ApiResponse( { status:201 ,description:'Обновлена категория', type: Category })
  update(@Param('id', ParseIntPipe) id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiResponse( { status:201 ,description:'Категория удалена', type: Category })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.categoriesService.remove(+id);
  }
}
