import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Treatment } from './treatment.entity';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { TreatmentCategory } from '../treatment-category/treatment-category.entity';
import { Equipment } from '../equipment/equipment.entity';

@Injectable()
export class TreatmentService {
  constructor(
    @InjectRepository(Treatment)
    private readonly treatmentRepository: Repository<Treatment>,
    @InjectRepository(TreatmentCategory)
    private readonly categoryRepository: Repository<TreatmentCategory>,
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,
  ) {}

  async create(createTreatmentDto: CreateTreatmentDto): Promise<Treatment> {
    const { categoryIds, equipmentIds, ...rest } = createTreatmentDto;

    const categories = await this.categoryRepository.findByIds(categoryIds);
    if (categories.length !== categoryIds.length) {
      throw new NotFoundException(
        'Uma ou mais categorias fornecidas não foram encontradas',
      );
    }

    const equipments = await this.equipmentRepository.findByIds(equipmentIds);
    if (equipments.length !== equipmentIds.length) {
      throw new NotFoundException(
        'Um ou mais equipamentos fornecidos não foram encontrados',
      );
    }

    const treatment = this.treatmentRepository.create({
      ...rest,
      categories,
      equipments,
    });

    return this.treatmentRepository.save(treatment);
  }

  async update(
    id: number,
    updateTreatmentDto: UpdateTreatmentDto,
  ): Promise<Treatment> {
    const treatment = await this.findOne(id);
    const { categoryIds, ...rest } = updateTreatmentDto;

    if (categoryIds) {
      const categories = await this.categoryRepository.findByIds(categoryIds);
      if (categories.length !== categoryIds.length) {
        throw new NotFoundException(
          'Uma ou mais categorias fornecidas não foram encontradas',
        );
      }
      treatment.categories = categories;
    }

    Object.assign(treatment, rest);
    return this.treatmentRepository.save(treatment);
  }

  async findOne(id: number): Promise<Treatment> {
    const treatment = await this.treatmentRepository.findOne({
      where: { id },
      relations: ['categories'],
    });
    if (!treatment) {
      throw new NotFoundException(`Tratamento com ID ${id} não encontrado`);
    }
    return treatment;
  }

  findAll(): Promise<Treatment[]> {
    return this.treatmentRepository.find();
  }

  async remove(id: number): Promise<void> {
    const result = await this.treatmentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Tratamento com ID ${id} não encontrado`);
    }
  }
}
