import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';

type InputItem = {
  id: string;
  name: string;
  divide: string;
  native: string;
  unit: string;
  price: number;
  count: number;
  amount: number;
};

@Entity()
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'jsonb' })
  items!: [InputItem];

  @Column({ type: 'boolean', default: false })
  completed!: boolean;

  @Column({ type: 'boolean', default: false })
  deleted!: boolean;

  @Column({ type: 'timestamptz' })
  @CreateDateColumn()
  created_at!: Date;

  @Column({ type: 'timestamptz' })
  @UpdateDateColumn()
  updated_at!: Date;

  // Relations
  @Column({ nullable: true })
  user_id!: string;

  @ManyToOne((type) => User, (user) => user.carts)
  user!: User;
}
