import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Wedding } from '.';

// 답례품
@Entity()
export class Present extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // 식대 분할
  @Column({ type: 'text' })
  present!: string;

  // 식대 단가
  @Column()
  present_price!: number;

  // 하객 인원
  @Column()
  present_num_husband!: number;

  @Column()
  present_num_bride!: number;

  // Relations
  @Column({ nullable: true })
  weddingId!: string;

  @OneToOne((type) => Wedding, (wedding) => wedding.presentId)
  wedding!: Wedding;
}
