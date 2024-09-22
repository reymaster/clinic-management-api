import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Treatment } from '../treatment/treatment.entity';

@Entity('equipments') // Nome da tabela no banco de dados
export class Equipment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Nome do equipamento

  @Column()
  description: string; // Descrição do equipamento

  @Column()
  status: string; // Status do equipamento (ex: disponível, em manutenção)

  @Column({ default: true })
  isActive: boolean; // Equipamento ativo ou não

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Treatment, (treatment) => treatment.equipments)
  @JoinTable({ name: 'treatment_equipments_equipments' })
  treatments: Treatment[];
}
