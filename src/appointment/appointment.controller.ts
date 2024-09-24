import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ConflictException,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Appointment } from './appointment.entity';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ERole } from '../auth/roles.enum';
import { GetUser } from '../common/decorators/get-user.decorator';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { EAppointmentStatus } from './appointment-status.enum';

@Controller('appointment')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  @Roles(ERole.Admin, ERole.User)
  async create(
    @Body() appointment: CreateAppointmentDto,
  ): Promise<Appointment> {
    try {
      return await this.appointmentService.create(appointment);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(
          'Já existe um agendamento neste dia e horário.',
        );
      }
      throw error; // Re-lança outros erros
    }
  }

  @Get()
  @Roles(ERole.Admin, ERole.User)
  async findAll(@GetUser() user: any): Promise<Appointment[]> {
    return this.appointmentService.findAll(user);
  }

  @Get(':id')
  @Roles(ERole.Admin, ERole.User)
  async findOne(
    @Param('id') id: number,
    @GetUser() user: any,
  ): Promise<Appointment> {
    return this.appointmentService.findOne(id, user);
  }

  @Get('status/:status')
  @Roles(ERole.Admin, ERole.User)
  async findByStatus(
    @Param('status') status: EAppointmentStatus,
    @GetUser() user: any,
  ): Promise<Appointment[]> {
    return this.appointmentService.findAllByStatus(status, user);
  }

  @Get('pending')
  @Roles(ERole.Admin, ERole.User)
  async findPending(@GetUser() user: any): Promise<Appointment[]> {
    return this.appointmentService.findPendingAppointments(user);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() appointment: Appointment,
    @GetUser() user: any,
  ): Promise<Appointment> {
    return this.appointmentService.update(id, appointment, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.appointmentService.remove(id);
  }
}
