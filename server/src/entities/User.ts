import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Cart } from './Cart';
import { Bill } from './Bill';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  username!: string;

  @Column({ type: 'text' })
  password!: string | undefined;

  @Column({ type: 'boolean' })
  admin!: boolean;

  @Column({ type: 'timestamptz' })
  @CreateDateColumn()
  created_at!: Date;

  @Column({ type: 'timestamptz' })
  @UpdateDateColumn()
  updated_at!: Date;

  // Relations
  @OneToMany((type) => Cart, (cart) => cart.user_id)
  carts!: [Cart];

  @OneToMany((type) => Bill, (bill) => bill.user_id)
  bills!: [Bill];

  // Methods
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async setPassword(password: string): Promise<void> {
    this.password = await this.hashPassword(password);
  }

  async validPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password!);
  }

  generateToken(): string {
    const token = {
      id: this.id,
      username: this.username,
      admin: this.admin,
    };
    return jwt.sign(token, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });
  }
}
