import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Treatment } from '../treatment/treatment.entity';
import { EAppointmentStatus } from './appointment-status.enum';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  clientId: number;

  @Column()
  treatmentId: number;

  @ManyToOne(() => User)
  client: User;

  @ManyToOne(() => Treatment)
  treatment: Treatment;

  @Column({ nullable: true, default: EAppointmentStatus.PENDING })
  status?: EAppointmentStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
