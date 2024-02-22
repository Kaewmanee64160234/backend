import { Activity } from 'src/activity/entities/activity.entity';
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

import { Room } from 'src/rooms/entities/room.entity';
import { Brokenequipment } from 'src/brokenequipment/entities/brokenequipment.entity';
import { Roomservice } from 'src/roomservice/entities/roomservice.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Booking } from './booking.entity';

@Entity()
export class BookingDetail {
  @PrimaryGeneratedColumn()
  booking_de_id: number;

  @Column({ type: 'real'})
  booking_de_total_price: number;

  @Column({ default: 0, nullable: true })
  booking_de_adult: number;

  @Column({ default: 0, nullable: true })
  booking_de_child: number;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;

  @OneToMany(() => Activity, (activity) => activity.bookingdetail)
  activity: Activity[];

  @OneToMany(() => Roomservice, (roomservice) => roomservice.bookingdetail)
  roomservice: Roomservice[];

  @OneToMany(() => Review, (review) => review.bookingdetail)
  review: Review[];

  @ManyToOne(() => Booking, (booking) => booking.bookingdetail)
  booking: Booking;

  @ManyToOne(() => Room, (room) => room.bookingdetail)
  room: Room;

  @ManyToOne(
    () => Brokenequipment,
    (brokenequipment) => brokenequipment.bookingdetail,
  )
  brokenequipment: Brokenequipment;
}
