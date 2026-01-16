import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  user_email: string;

  @Column({ length: 255 })
  phone: string;

  @Column({ type: 'jsonb' })
  products: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];

  @Column('float')
  total: number;

  @Column({ length: 255 })
  city: string;

  @Column({ length: 255 })
  address: string;

  @Column({ length: 255 })
  notes: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
