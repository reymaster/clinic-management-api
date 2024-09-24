import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UserService } from '../user/user.service';
import { TreatmentService } from '../treatment/treatment.service';
import { EAppointmentStatus } from './appointment-status.enum';
import { User } from '../user/user.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly userService: UserService,
    private readonly treatmentService: TreatmentService,
  ) {}

  async create(appointment: CreateAppointmentDto): Promise<Appointment> {
    // Verificar se já existe um agendamento na mesma data e horário
    const existingAppointment = await this.appointmentRepository.findOne({
      where: {
        date: appointment.date, // ajuste conforme a propriedade da sua entidade
      },
    });

    if (existingAppointment) {
      throw new ConflictException(
        'Já existe um agendamento neste dia e horário.',
      );
    }

    const client = await this.userService.findOne(appointment.clientId);

    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }

    const treatment = await this.treatmentService.findOne(
      appointment.treatmentId,
    );

    if (!treatment) {
      throw new NotFoundException('Tratamento não encontrado');
    }

    const entity = this.appointmentRepository.create({
      ...appointment,
      client,
      treatment,
    });

    return this.appointmentRepository.save(entity);
  }

  async findAll(user: any): Promise<Appointment[]> {
    if (user.role === 'admin') {
      return this.appointmentRepository.find({
        relations: ['client', 'treatment'],
      });
    } else {
      const customer = await this.userService.findOne(user.id);

      if (!customer) {
        throw new NotFoundException('Cliente não encontrado');
      }

      return this.appointmentRepository.find({
        where: { clientId: customer.id },
        relations: ['client', 'treatment'],
      });
    }
  }

  async findAllByStatus(
    status: EAppointmentStatus,
    user: User,
  ): Promise<Appointment[]> {
    if (user.role === 'admin') {
      return this.appointmentRepository.find({
        where: { status },
        relations: ['client', 'treatment'],
      });
    } else {
      const customer = await this.userService.findOne(user.id);

      if (!customer) {
        throw new NotFoundException('Cliente não encontrado');
      }

      return this.appointmentRepository.find({
        where: { clientId: customer.id, status },
        relations: ['client', 'treatment'],
      });
    }
  }

  async findPendingAppointments(user: User): Promise<Appointment[]> {
    if (user.role === 'admin') {
      return this.appointmentRepository.find({
        where: { status: EAppointmentStatus.PENDING },
        relations: ['client', 'treatment'],
      });
    } else {
      const customer = await this.userService.findOne(user.id);

      if (!customer) {
        throw new NotFoundException('Cliente não encontrado');
      }

      return this.appointmentRepository.find({
        where: { clientId: customer.id, status: EAppointmentStatus.PENDING },
        relations: ['client', 'treatment'],
      });
    }
  }

  async findOne(id: number, user: any): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
      relations: ['client', 'treatment'],
    });
    if (!appointment) {
      throw new NotFoundException(`Agendamento com ID ${id} não encontrado`);
    }

    // Verificar se o usuário é o dono do agendamento
    if (user.role !== 'admin' && appointment.client.id !== user.id) {
      throw new NotFoundException(
        `Agendamento com ID ${id} não encontrado para o usuário logado`,
      );
    }

    return appointment;
  }

  async update(
    id: number,
    appointment: Appointment,
    user: any,
  ): Promise<Appointment> {
    if (!id) {
      throw new NotFoundException('ID do agendamento é obrigatório');
    }

    const existingAppointment = await this.appointmentRepository.findOne({
      where: { id },
    });

    if (!existingAppointment) {
      throw new NotFoundException(`Agendamento com ID ${id} não encontrado`);
    }

    // Verificar se o usuário é o dono do agendamento
    if (user.role !== 'admin' && existingAppointment.client.id !== user.id) {
      throw new NotFoundException(
        `Agendamento com ID ${id} não encontrado para o usuário logado`,
      );
    }

    return this.appointmentRepository.save({
      ...existingAppointment,
      ...appointment,
    });
  }

  async remove(id: number): Promise<void> {
    const result = await this.appointmentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Agendamento com ID ${id} não encontrado`);
    }
  }
}
