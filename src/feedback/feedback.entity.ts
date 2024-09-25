import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Treatment } from '../treatment/treatment.entity';

@Entity('feedbacks')
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number; // Avaliação de 1 a 5 estrelas

  @Column()
  comment: string;

  @Column({ default: false })
  readed: boolean;

  @ManyToOne(() => User) // Relacionamento com o cliente que fez o feedback
  client: User;

  @ManyToOne(() => Treatment) // Relacionamento com o tratamento avaliado
  treatment: Treatment;

  @Column()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
