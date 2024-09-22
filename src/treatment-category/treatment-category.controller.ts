import {
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Body,
  UseGuards,
} from '@nestjs/common';
import { TreatmentCategoryService } from './treatment-category.service';
import { CreateTreatmentCategoryDto } from './dto/create-treatment-category.dto';
import { Roles } from '../auth/roles.decorator';
import { ERole } from '../auth/roles.enum';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('treatment-category')
export class TreatmentCategoryController {
  constructor(private readonly categoryService: TreatmentCategoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Admin)
  create(@Body() createCategoryDto: CreateTreatmentCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Admin)
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Admin, ERole.User)
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Admin)
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
