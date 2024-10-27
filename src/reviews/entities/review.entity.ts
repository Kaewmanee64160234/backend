import { BookingDetail } from 'src/booking/entities/bookingDetail';
import { Room } from 'src/rooms/entities/room.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  rev_id: number;

  @Column({ type: 'int', nullable: false }) // Explicit type and non-nullable
  rev_star_clean: number;

  @Column({ type: 'int', nullable: false }) // Explicit type and non-nullable
  rev_star_service: number;

  @Column({ type: 'int', nullable: false }) // Explicit type and non-nullable
  rev_star_conv: number;

  @Column({ type: 'text', nullable: true }) // Optional comment
  rev_comment: string;

  @CreateDateColumn()
  rev_date: Date;

  @DeleteDateColumn()
  deleteDate: Date;

  @ManyToOne(() => Room, (room) => room.review)
  room: Room;

  @ManyToOne(() => BookingDetail, (bookingDetail) => bookingDetail.review)
  bookingDetail: BookingDetail;
}
