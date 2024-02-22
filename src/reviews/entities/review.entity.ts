import { BookingDetail } from 'src/booking/entities/bookingDetail';
import { Room } from 'src/rooms/entities/room.entity';
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
export class Review {
  @PrimaryGeneratedColumn()
  rev_id: number;

  @Column()
  rev_star_clean: number;

  @Column()
  rev_star_service: number;

  @Column()
  rev_star_conv: number;

  @Column({ type: 'text', nullable: true })
  rev_comment: string;

  @CreateDateColumn()
  rev_date: Date;

  @DeleteDateColumn()
  deleteDate: Date;

  @ManyToOne(() => Room, (room) => room.review)
  room: Room;

  @ManyToOne(() => BookingDetail, (bookingdetail) => bookingdetail.review)
  bookingdetail: BookingDetail;
}
