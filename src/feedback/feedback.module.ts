import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { Feedback } from './feedback.entity';
import { User } from '../user/user.entity';
import { Treatment } from '../treatment/treatment.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { TreatmentService } from '../treatment/treatment.service';
import { TreatmentCategory } from '../treatment-category/treatment-category.entity';
import { Equipment } from '../equipment/equipment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Feedback,
      User,
      Treatment,
      TreatmentCategory,
      Equipment,
    ]),
  ], // Registrando os repositórios
  controllers: [FeedbackController],
  providers: [FeedbackService, UserService, TreatmentService, JwtService],
  exports: [FeedbackService],
})
export class FeedbackModule {}
