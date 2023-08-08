import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ParseIntPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto, UpdateCategoryScheme } from './dto/update-category.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiResponse } from '@nestjs/swagger/dist/decorators'; 
import { Category } from './entities/category.entity';
import { JoiValidationPipe } from '../pipes/ValidationPipe'; 
import { CreateCategoryScheme } from './dto/create-category.dto';
import { FileInterceptor } from "@nestjs/platform-express";

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
  @Patch(':id')
  @ApiResponse( { status:201 ,description:'Обновлена категория', type: Category })
  update(@Param('id', ParseIntPipe) id: string, @Body(new JoiValidationPipe(UpdateCategoryScheme)) updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiResponse( { status:201 ,description:'Категория удалена', type: Category })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.categoriesService.remove(+id);
  }

  // @UseGuards(AuthGuard('jwt'))
  // @ApiResponse( { status:201 ,description:'Импорт успешен', type: Category })
  // @Post('excel')
  // @UseInterceptors(FileInterceptor('file'))
  // async import(@UploadedFile() file: Express.Multer.File) {
  //   const Excel = require('exceljs');
  //   const fs = require('fs')

  //   let workBook = new Excel.Workbook();

  //   console.log(new Uint8Array(file.buffer));
    
  //   await workBook.xlsx.readFile(file.buffer, {
  //     type: 'buffer'
  //   });

  //   let sheet = workBook.getWorkSheet('Лист1');

  //   for(let i = 0; i < sheet.actualRowCount; i++){
  //     let row = sheet.getRow(i)
  //     let cell = row.getCell(1).value

  //     let data = {
  //       name: cell
  //     }

  //     await this.categoriesService.create(data)
  //   }
    
  // }
}
