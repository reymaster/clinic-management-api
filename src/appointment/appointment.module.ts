import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { Appointment } from './appointment.entity';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { TreatmentService } from '../treatment/treatment.service';
import { Treatment } from '../treatment/treatment.entity';
import { TreatmentCategory } from '../treatment-category/treatment-category.entity';
import { Equipment } from '../equipment/equipment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Appointment,
      User,
      Treatment,
      TreatmentCategory,
      Equipment,
    ]),
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService, UserService, JwtService, TreatmentService],
})
export class AppointmentModule {}
