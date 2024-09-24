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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../auth/roles.decorator';
import { ERole } from '../auth/roles.enum';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Endpoint para criar um novo usuário
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // Endpoint para listar todos os usuários
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Admin)
  findAll() {
    return this.userService.findAll();
  }

  // Endpoint para buscar um usuário por ID
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Admin, ERole.User)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  // Endpoint para atualizar um usuário
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Admin, ERole.User)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  // Endpoint para remover um usuário
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.Admin)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
