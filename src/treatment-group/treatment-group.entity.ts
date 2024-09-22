import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { TreatmentCategory } from '../treatment-category/treatment-category.entity';

@Entity('treatment_groups')
export class TreatmentGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Nome do grupo (ex: Tratamentos Corporais)

  @ManyToMany(() => TreatmentCategory, (category) => category.groups)
  categories: TreatmentCategory[]; // Relacionamento 1 para muitos com categorias
}
