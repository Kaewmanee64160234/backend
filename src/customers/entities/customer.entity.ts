import { Booking } from 'src/booking/entities/booking.entity';
import { Receipt } from 'src/receipts/entities/receipt.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  cus_id: number;

  @Column({type: "text"})
  cus_name: string;

  @CreateDateColumn()
  cus_start_date: Date;

  @DeleteDateColumn()
  deleteDate: Date;

  @OneToOne(() => User, (user) => user.customer)
  @JoinColumn()
  user: User;

  @OneToMany(() => Booking, (booking) => booking.customer)
  booking: Booking[];
}
