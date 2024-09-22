import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ERole } from '../auth/roles.enum';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Post()
  create(@Body() createEquipmentDto: CreateEquipmentDto) {
    return this.equipmentService.create(createEquipmentDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Admin)
  findAll() {
    return this.equipmentService.findAll();
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(ERole.Admin, ERole.User)
  findOne(@Param('id') id: string) {
    return this.equipmentService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(ERole.Admin)
  update(
    @Param('id') id: string,
    @Body() updateEquipmentDto: UpdateEquipmentDto,
  ) {
    return this.equipmentService.update(+id, updateEquipmentDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(ERole.Admin)
  remove(@Param('id') id: string) {
    return this.equipmentService.remove(+id);
  }
}
