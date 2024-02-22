import { Booking } from 'src/booking/entities/booking.entity';
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
export class Promotion {
  @PrimaryGeneratedColumn()
  prom_id: number;

  @CreateDateColumn()
  prom_created_date: Date;

  @Column()
  prom_end_date: Date;

  @Column({ type: 'text'})
  prom_name: string;

  @Column({ type: 'real', nullable: true })
  prom_discount: number;

  @Column({ nullable: true })
  prom_discount_pres: number;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;

  @OneToMany(() => Booking, (booking) => booking.promotion)
  booking: Booking[];
}
