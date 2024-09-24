import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { TreatmentCategory } from '../treatment-category/treatment-category.entity';
import { Equipment } from '../equipment/equipment.entity';

@Entity()
export class Treatment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('int')
  duration: number; // duração em minutos

  @Column('decimal', { precision: 5, scale: 2 })
  price: number; // preço do tratamento

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => TreatmentCategory, (category) => category.treatments, {
    eager: true,
  })
  @JoinTable()
  categories: TreatmentCategory[];

  @ManyToMany(() => Equipment, (equipment) => equipment.treatments)
  @JoinTable({ name: 'treatment_equipments_equipments' })
  equipments: Equipment[];
}
