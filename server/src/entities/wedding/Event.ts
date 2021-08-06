import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Wedding } from '.';

// 이벤트 (연주, 축가 등)
@Entity()
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // 연주
  @Column()
  play_husband!: number;

  @Column()
  play_bride!: number;

  // 축가
  @Column()
  anthem_husband!: number;

  @Column()
  anthem_bride!: number;

  // 사회자
  @Column()
  moderator_husband!: number;

  @Column()
  moderator_bride!: number;

  // 주례
  @Column()
  officiate_husband!: number;

  @Column()
  officiate_bride!: number;

  // Relations
  @Column({ nullable: true })
  weddingId!: string;

  @OneToOne((type) => Wedding, (wedding) => wedding.eventId)
  wedding!: Wedding;
}
