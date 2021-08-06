import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Convention } from './Convention';
import { Company } from './Company';
import { Hanbok } from './Hanbok';
import { Event } from './Event';
import { Meal } from './Meal';
import { Present } from './Present';
import { Reserve } from './Reserve';

/*
  convention
  company
  hanbok
  event
  meal
  present
  reserve
*/

@Entity()
export class Wedding extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  husband_name!: string;

  @Column({ type: 'text', nullable: true })
  husband_image!: string;

  @Column({ type: 'text' })
  bride_name!: string;

  @Column({ type: 'text', nullable: true })
  bride_image!: string;

  @Column({ type: 'text' })
  wedding_at!: string;

  @Column({ type: 'text' })
  event_at!: string;

  @Column()
  cost_husband!: number;

  @Column()
  cost_bride!: number;

  @Column()
  meal_husband!: number;

  @Column()
  meal_bride!: number;

  @Column()
  present_husband!: number;

  @Column()
  present_bride!: number;

  @Column()
  reserve_husband!: number;

  @Column()
  reserve_bride!: number;

  @Column({ type: 'timestamptz' })
  @CreateDateColumn()
  created_at!: Date;

  @Column({ type: 'timestamptz' })
  @UpdateDateColumn()
  updated_at!: Date;

  // Relations
  // Convention 예식비용
  @Column({ nullable: true })
  conventionId!: string;

  @OneToOne((type) => Convention, (convention) => convention.weddingId)
  convention!: Convention;

  // Company 웨딩업체
  @Column({ nullable: true })
  companyId!: string;

  @OneToOne((type) => Company, (company) => company.weddingId)
  company!: Company;

  // Hanbok 한복업체
  @Column({ nullable: true })
  hanbokId!: string;

  @OneToOne((type) => Hanbok, (hanbok) => hanbok.weddingId)
  hanbok!: Hanbok;

  // Event 이벤트(축가, 사회자, 연주 등)
  @Column({ nullable: true })
  eventId!: string;

  @OneToOne((type) => Event, (event) => event.weddingId)
  event!: Event;

  // Meal 식사비용
  @Column({ nullable: true })
  mealId!: string;

  @OneToOne((type) => Meal, (meal) => meal.weddingId)
  meal!: Meal;

  // Present 답례품 비용
  @Column({ nullable: true })
  presentId!: string;

  @OneToOne((type) => Present, (present) => present.weddingId)
  present!: Present;

  // Reserve 예약금
  @Column({ nullable: true })
  reserveId!: string;

  @OneToOne((type) => Reserve, (reserve) => reserve.weddingId)
  reserve!: Reserve;
}
