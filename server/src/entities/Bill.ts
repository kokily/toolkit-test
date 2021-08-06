import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InputItem } from '.';
import { Cart } from './Cart';
import { User } from './User';

@Entity()
export class Bill extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  title!: string;

  @Column({ type: 'text' })
  hall!: string;

  @Column({ type: 'text' })
  etc!: string;

  @Column()
  total_amount!: number;

  @Column({ type: 'jsonb' })
  items!: [InputItem];

  @Column({ nullable: true })
  reserve!: number;

  @Column({ type: 'timestamptz' })
  @CreateDateColumn()
  created_at!: Date;

  // Relations
  @Column({ nullable: true })
  cart_id!: string;

  @OneToOne((type) => Cart, (cart) => cart.bill_id)
  cart!: Cart;

  @Column({ nullable: true })
  user_id!: string;

  @Column({ nullable: true })
  username!: string;

  @ManyToOne((type) => User, (user) => user.bills)
  user!: User;
}
