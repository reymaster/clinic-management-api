import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { User } from '../user/user.entity';
import { Treatment } from '../treatment/treatment.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Treatment)
    private readonly treatmentRepository: Repository<Treatment>,
  ) {}

  // Criação de feedback
  async create(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
    const client = await this.userRepository.findOne({
      where: { id: createFeedbackDto.clientId },
    });
    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }

    const treatment = await this.treatmentRepository.findOne({
      where: { id: createFeedbackDto.treatmentId },
    });
    if (!treatment) {
      throw new NotFoundException('Tratamento não encontrado');
    }

    const feedback = this.feedbackRepository.create({
      rating: createFeedbackDto.rating,
      comment: createFeedbackDto.comment,
      client,
      treatment,
      createdAt: new Date(),
    });

    return this.feedbackRepository.save(feedback);
  }

  // Buscar todos os feedbacks
  findAll(): Promise<Feedback[]> {
    return this.feedbackRepository.find({ relations: ['client', 'treatment'] });
  }

  // Buscar feedback por ID
  async findOne(id: number): Promise<Feedback> {
    const feedback = await this.feedbackRepository.findOne({
      where: { id },
      relations: ['client', 'treatment'],
    });
    if (!feedback) {
      throw new NotFoundException(`Feedback com ID ${id} não encontrado`);
    }
    return feedback;
  }

  async getFeedbacksByTreatmentId(treatmentId: number): Promise<Feedback[]> {
    return this.feedbackRepository.find({
      where: { treatment: { id: treatmentId } },
      relations: ['client', 'treatment'],
    });
  }

  // Atualizar feedback por ID
  async update(
    id: number,
    createFeedbackDto: CreateFeedbackDto,
    user: any,
  ): Promise<Feedback> {
    const feedback = await this.findOne(id);
    if (!feedback) {
      throw new NotFoundException(`Feedback com ID ${id} não encontrado`);
    }

    // se o feedback for do mesmo cliente, ou o role do user for admin, atualiza
    this.validateUserPermission(feedback, user);

    const client = await this.userRepository.findOne({
      where: { id: createFeedbackDto.clientId },
    });
    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }

    const treatment = await this.treatmentRepository.findOne({
      where: { id: createFeedbackDto.treatmentId },
    });
    if (!treatment) {
      throw new NotFoundException('Tratamento não encontrado');
    }

    feedback.rating = createFeedbackDto.rating;
    feedback.comment = createFeedbackDto.comment;
    feedback.client = client;
    feedback.treatment = treatment;

    return this.feedbackRepository.save(feedback);
  }

  private validateUserPermission(feedback: Feedback, user: any) {
    if (feedback.client.id !== user.id && user.role !== 'admin') {
      throw new ForbiddenException(
        'Você não tem permissão para executar essa ação',
      );
    }
  }

  // Deletar feedback por ID
  async remove(id: number, user: any): Promise<void> {
    if (!id) {
      throw new NotFoundException('ID não informado');
    }

    const feedback = await this.findOne(id);
    if (!feedback) {
      throw new NotFoundException(`Feedback com ID ${id} não encontrado`);
    }

    // se o feedback for do mesmo cliente, ou o role do user for admin, deleta
    this.validateUserPermission(feedback, user);

    await this.feedbackRepository.delete(id);
  }
}
