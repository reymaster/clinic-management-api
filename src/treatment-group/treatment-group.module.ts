import { Module } from '@nestjs/common';
import { TreatmentGroupService } from './treatment-group.service';
import { TreatmentGroupController } from './treatment-group.controller';
import { TreatmentGroup } from './treatment-group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TreatmentGroup, User])],
  providers: [TreatmentGroupService, UserService, JwtService],
  controllers: [TreatmentGroupController],
})
export class TreatmentGroupModule {}
