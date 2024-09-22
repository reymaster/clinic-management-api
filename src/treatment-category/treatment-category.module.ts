import { Module } from '@nestjs/common';
import { TreatmentCategoryService } from './treatment-category.service';
import { TreatmentCategoryController } from './treatment-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TreatmentCategory } from './treatment-category.entity';
import { TreatmentGroup } from '../treatment-group/treatment-group.entity';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([TreatmentCategory, TreatmentGroup, User]),
  ],
  providers: [TreatmentCategoryService, UserService, JwtService],
  controllers: [TreatmentCategoryController],
})
export class TreatmentCategoryModule {}
