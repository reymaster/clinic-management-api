import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { Equipment } from './equipment.entity';
import { Treatment } from '../treatment/treatment.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Equipment, Treatment, User])], // Registrando o repositório
  controllers: [EquipmentController],
  providers: [EquipmentService, UserService, JwtService],
})
export class EquipmentModule {}
