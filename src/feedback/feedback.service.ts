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
import { UserService } from '../user/user.service';
import { TreatmentService } from '../treatment/treatment.service';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
    private readonly userService: UserService,
    private readonly treatmentService: TreatmentService,
  ) {}

  // Criação de feedback
  async create(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
    const client = await this.userService.findOne(createFeedbackDto.clientId);
    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }

    const treatment = await this.treatmentService.findOne(
      createFeedbackDto.treatmentId,
    );
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
  async findAll(readed = false, user: User): Promise<Feedback[]> {
    const query = this.feedbackRepository
      .createQueryBuilder('feedback')
      .leftJoinAndSelect('feedback.client', 'client')
      .leftJoinAndSelect('feedback.treatment', 'treatment');

    const handleReaded = readed ? true : false;

    query.andWhere('feedback.readed = :readed', { readed: handleReaded });

    if (user.role !== 'admin') {
      query.andWhere('feedback.client.id = :clientId', { clientId: user.id });
    }

    return query.getMany();
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
    createFeedbackDto: Partial<CreateFeedbackDto>,
    user: any,
  ): Promise<Feedback> {
    const feedback = await this.findOne(id);
    if (!feedback) {
      throw new NotFoundException(`Feedback com ID ${id} não encontrado`);
    }

    // se o feedback for do mesmo cliente, ou o role do user for admin, atualiza
    this.validateUserPermission(feedback, user);

    const updatedFeedback = this.feedbackRepository.merge(
      feedback,
      createFeedbackDto,
    );

    return this.feedbackRepository.save(updatedFeedback);
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
