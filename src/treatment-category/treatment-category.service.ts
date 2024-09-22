import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TreatmentCategory } from './treatment-category.entity';
import { TreatmentGroup } from '../treatment-group/treatment-group.entity';
import { CreateTreatmentCategoryDto } from './dto/create-treatment-category.dto';
import { UpdateTreatmentCategoryDto } from './dto/update-treatment-category.dto';

@Injectable()
export class TreatmentCategoryService {
  constructor(
    @InjectRepository(TreatmentCategory)
    private readonly categoryRepository: Repository<TreatmentCategory>,
    @InjectRepository(TreatmentGroup)
    private readonly groupRepository: Repository<TreatmentGroup>,
  ) {}

  async create(
    createCategoryDto: CreateTreatmentCategoryDto,
  ): Promise<TreatmentCategory> {
    const { groupIds, ...rest } = createCategoryDto;

    const groups = await this.groupRepository.findByIds(groupIds);
    if (groups.length !== groupIds.length) {
      throw new NotFoundException(
        'Um ou mais grupos fornecidos não foram encontrados',
      );
    }

    const category = this.categoryRepository.create({
      ...rest,
      groups,
    });

    return this.categoryRepository.save(category);
  }

  async update(
    id: number,
    updateCategoryDto: UpdateTreatmentCategoryDto,
  ): Promise<TreatmentCategory> {
    const category = await this.findOne(id);
    const { groupIds, ...rest } = updateCategoryDto;

    if (groupIds) {
      const groups = await this.groupRepository.findByIds(groupIds);
      if (groups.length !== groupIds.length) {
        throw new NotFoundException(
          'Um ou mais grupos fornecidos não foram encontrados',
        );
      }
      category.groups = groups;
    }

    Object.assign(category, rest);
    return this.categoryRepository.save(category);
  }

  async findOne(id: number): Promise<TreatmentCategory> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['groups'],
    });
    if (!category) {
      throw new NotFoundException(`Categoria com ID ${id} não encontrada`);
    }
    return category;
  }

  // Listar todas as categorias
  findAll(): Promise<TreatmentCategory[]> {
    return this.categoryRepository.find({
      relations: ['groups', 'treatments'],
    });
  }

  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);
    await this.categoryRepository.remove(category);
  }
}
