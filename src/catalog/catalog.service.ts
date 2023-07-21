import { Injectable } from '@nestjs/common';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Catalog } from './entities/catalog.entity';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class CatalogService {
  constructor(
    @InjectRepository(Catalog)
    private repository: Repository<Catalog>
  ) {}

  create(createCatalogDto: CreateCatalogDto) {
    return this.repository.save(createCatalogDto);
  }

  findAll() {
    return this.repository.find({
      relations: {
        category_id: true,
    },
    });
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  update(id: number, updateCatalogDto: UpdateCatalogDto) {
    return this.repository.save({...updateCatalogDto, id})
  }

  filter(сur_id: number) {
    
    return this.repository.findBy({
      category_id: Equal(сur_id),
    })
  }
  async remove(id: number) {
    return await this.repository.delete(id);
  }
}
