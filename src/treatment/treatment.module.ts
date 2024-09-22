import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TreatmentService } from './treatment.service';
import { TreatmentController } from './treatment.controller';
import { Treatment } from './treatment.entity';
import { TreatmentCategory } from '../treatment-category/treatment-category.entity';
import { Equipment } from '../equipment/equipment.entity';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Treatment, TreatmentCategory, Equipment, User]),
  ], // Registrando a entidade Treatment
  controllers: [TreatmentController],
  providers: [TreatmentService, UserService, JwtService],
})
export class TreatmentModule {}
