import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
} from 'typeorm';
import { Wedding } from '.';

// 한복업체
@Entity()
export class Hanbok extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // 한복 선불
  @Column()
  hanbok_pre_husband!: number;

  @Column()
  hanbok_pre_bride!: number;

  // 한복 후불
  @Column()
  hanbok_post_husband!: number;

  @Column()
  hanbok_post_bride!: number;

  // Relations
  @Column({ nullable: true })
  weddingId!: string;

  @OneToOne((type) => Wedding, (wedding) => wedding.hanbokId)
  wedding!: Wedding;
}
