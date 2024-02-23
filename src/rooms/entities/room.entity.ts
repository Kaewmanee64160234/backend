import { BookingDetail } from 'src/booking/entities/bookingDetail';
import { Review } from 'src/reviews/entities/review.entity';
import { Roomtype } from 'src/roomtypes/entities/roomtype.entity';
import {
  Entity,
  PrimaryColumn,
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
export class Room {
  @PrimaryColumn({ unique: true })
  room_id: string;

  @Column({ type: 'text' })
  room_img_path: string;

  @Column({ type: 'text' })
  room_status: string;

  @DeleteDateColumn()
  deleteDate: Date;

  @OneToMany(() => Review, (review) => review.room)
  review: Review[];

  @OneToMany(() => BookingDetail, (bookingDetail) => bookingDetail.room)
  bookingDetail: BookingDetail[];

  @ManyToOne(() => Roomtype, (roomtype) => roomtype.room)
  roomtype: Roomtype;
}
