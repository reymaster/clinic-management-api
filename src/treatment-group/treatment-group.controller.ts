import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateTreatmentGroupDto } from './dto/create-treatment-group.dto';
import { TreatmentGroupService } from './treatment-group.service';
import { Roles } from '../auth/roles.decorator';
import { ERole } from '../auth/roles.enum';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('treatment-group')
export class TreatmentGroupController {
  constructor(private readonly groupService: TreatmentGroupService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Admin)
  create(@Body() createGroupDto: CreateTreatmentGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Admin, ERole.User)
  findAll() {
    return this.groupService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Admin, ERole.User)
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(+id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Admin)
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id);
  }
}
