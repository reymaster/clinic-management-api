import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TreatmentGroup } from './treatment-group.entity';
import { CreateTreatmentGroupDto } from './dto/create-treatment-group.dto';

@Injectable()
export class TreatmentGroupService {
  constructor(
    @InjectRepository(TreatmentGroup)
    private readonly groupRepository: Repository<TreatmentGroup>,
  ) {}

  async create(
    createGroupDto: CreateTreatmentGroupDto,
  ): Promise<TreatmentGroup> {
    const group = this.groupRepository.create(createGroupDto);
    return this.groupRepository.save(group);
  }

  async findAll(): Promise<TreatmentGroup[]> {
    return this.groupRepository.find({ relations: ['categories'] });
  }

  async findOne(id: number): Promise<TreatmentGroup> {
    return this.groupRepository.findOne({
      where: { id },
      relations: ['categories'],
    });
  }

  async remove(id: number): Promise<void> {
    return this.groupRepository.delete(id).then(() => undefined);
  }
}
