import { BookingDetail } from 'src/booking/entities/bookingDetail';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Brokenequipment {
  @PrimaryGeneratedColumn()
  bro_ep_id: number;

  @Column({ type: 'text' })
  bro_ep_name: string;
  ฆ;
  @Column()
  bro_ep_qty: number;

  @Column({ nullable: true, type: 'text' })
  bro_ep_note: string;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;

  @OneToMany(
    () => BookingDetail,
    (bookingDetail) => bookingDetail.brokenEquipment,
  )
  bookingDetail: BookingDetail[];
}
