import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
} from 'typeorm';
import { Wedding } from '.';

// 예식 비용
@Entity()
export class Convention extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // 웨딩홀 사용료
  @Column()
  rental_husband!: number;

  @Column()
  rental_bride!: number;

  // 예도칼 사용료
  @Column()
  sword_husband!: number;

  @Column()
  sword_bride!: number;

  // 장갑 사용료
  @Column()
  glove_husband!: number;

  @Column()
  glove_bride!: number;

  // 부케
  @Column()
  bouquet_husband!: number;

  @Column()
  bouquet_bride!: number;

  // 폐백음식
  @Column()
  ceremony_husband!: number;

  @Column()
  ceremony_bride!: number;

  // Relations
  @Column({ nullable: true })
  weddingId!: string;

  @OneToOne((type) => Wedding, (wedding) => wedding.conventionId)
  wedding!: Wedding;
}
