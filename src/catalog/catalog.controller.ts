import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ParseIntPipe } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CreateCatalogDto, CreateProductScheme } from './dto/create-catalog.dto';
import { UpdateCatalogDto, UpdateProductScheme } from './dto/update-catalog.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiResponse } from '@nestjs/swagger/dist/decorators';
import { Catalog } from './entities/catalog.entity'; 
import { JoiValidationPipe } from '../pipes/ValidationPipe'; 

@ApiTags("Catalog")
@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiResponse( { status:201 ,description:'Товар добавлен', type: Catalog })
  @UsePipes(new JoiValidationPipe(CreateProductScheme))
  @Post()
  create(@Body() createCatalogDto: CreateCatalogDto) {
    return this.catalogService.create(createCatalogDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiResponse( { status:200 ,description:'Получены все товары' })
  findAll() {
    return this.catalogService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiResponse( { status:201 ,description:'Получен 1 товар' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.catalogService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))  
  @UsePipes(new JoiValidationPipe(UpdateProductScheme))
  @ApiResponse( { status:201 ,description:'Товар обновлен', type: Catalog })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateCatalogDto: UpdateCatalogDto) {
    return this.catalogService.update(+id, updateCatalogDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiResponse( { status:201 ,description:'Товар удален', type: Catalog })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.catalogService.remove(+id);
  }
}
