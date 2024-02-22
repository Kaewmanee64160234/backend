import { BookingDetail } from 'src/booking/entities/bookingDetail';
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
export class Roomservice {
  @PrimaryGeneratedColumn()
  room_ser_id: number;

  @Column({ type: 'text', nullable: true })
  room_ser_type: string;

  @Column({ type: 'text', nullable: true })
  room_ser_name: string;

  @Column({ type: 'real', nullable: true })
  room_ser_price: number;

  @CreateDateColumn()
  room_ser_timedel: Date;

  @DeleteDateColumn()
  room_ser_datedel: Date;

  @Column({ nullable: true })
  room_ser_status: string;

  @ManyToOne(() => BookingDetail, (bookingdetail) => bookingdetail.roomservice)
  bookingdetail: BookingDetail;
}
