import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Wedding } from '.';

// Meal 식사비용
@Entity()
export class Meal extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // 식대 분할
  @Column({ type: 'text' })
  meals!: string;

  // 식대 단가
  @Column()
  meals_price!: number;

  // 하객 인원
  @Column()
  meals_num_husband!: number;

  @Column()
  meals_num_bride!: number;

  // Relations
  @Column({ nullable: true })
  weddingId!: string;

  @OneToOne((type) => Wedding, (wedding) => wedding.mealId)
  wedding!: Wedding;
}
