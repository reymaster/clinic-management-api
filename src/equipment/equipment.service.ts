import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Equipment } from './equipment.entity';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { Treatment } from '../treatment/treatment.entity';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,
    @InjectRepository(Treatment)
    private readonly treatmentRepository: Repository<Treatment>,
  ) {}

  async create(createEquipmentDto: CreateEquipmentDto): Promise<Equipment> {
    const { treatmentIds, ...rest } = createEquipmentDto;

    const treatments = await this.treatmentRepository.findBy({
      id: In(treatmentIds),
    });
    if (treatments.length !== treatmentIds.length) {
      throw new NotFoundException(
        'Um ou mais tratamentos fornecidos não foram encontrados',
      );
    }

    const equipment = this.equipmentRepository.create({
      ...rest,
      treatments,
    });

    return this.equipmentRepository.save(equipment);
  }

  async update(
    id: number,
    updateEquipmentDto: UpdateEquipmentDto,
  ): Promise<Equipment> {
    const equipment = await this.findOne(id);
    const { treatmentIds, ...rest } = updateEquipmentDto;

    if (treatmentIds) {
      const treatments = await this.treatmentRepository.findByIds(treatmentIds);
      if (treatments.length !== treatmentIds.length) {
        throw new NotFoundException(
          'Um ou mais tratamentos fornecidos não foram encontrados',
        );
      }
      equipment.treatments = treatments;
    }

    Object.assign(equipment, rest);
    return this.equipmentRepository.save(equipment);
  }

  async findOne(id: number): Promise<Equipment> {
    const equipment = await this.equipmentRepository.findOne({
      where: { id },
      relations: ['treatments'],
    });
    if (!equipment) {
      throw new NotFoundException(`Equipamento com ID ${id} não encontrado`);
    }
    return equipment;
  }

  // Listar todos os equipamentos
  findAll(): Promise<Equipment[]> {
    return this.equipmentRepository.find();
  }

  // Remover um equipamento
  async remove(id: number): Promise<void> {
    const result = await this.equipmentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Equipamento com ID ${id} não encontrado`);
    }
  }
}
