import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
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

  // @Column({ type: 'real' })
  // booking_de_total_price: number;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;

  @OneToMany(() => Roomservice, (roomservice) => roomservice.bookingDetail)
  roomservice: Roomservice[];

  @OneToMany(() => Review, (review) => review.bookingDetail)
  review: Review[];

  @ManyToOne(() => Booking, (booking) => booking.bookingDetail)
  booking: Booking;

  @ManyToOne(() => Room, (room) => room.bookingDetail)
  room: Room;

  @ManyToOne(
    () => Brokenequipment,
    (brokenequipment) => brokenequipment.bookingDetail,
  )
  brokenEquipment: Brokenequipment;
}
