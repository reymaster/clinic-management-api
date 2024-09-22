import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Treatment } from '../treatment/treatment.entity';
import { TreatmentGroup } from '../treatment-group/treatment-group.entity';

@Entity('treatment_categories')
export class TreatmentCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Nome da categoria (ex: Gordura Localizada)

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => TreatmentGroup, (group) => group.categories)
  @JoinTable() // Cria a tabela pivot
  groups: TreatmentGroup[];

  @ManyToMany(() => Treatment, (treatment) => treatment.categories)
  treatments: Treatment[]; // Relacionamento 1 para muitos com tratamentos
}
