import { Activity } from 'src/activity/entities/activity.entity';
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
export class Activityper {
  @PrimaryGeneratedColumn()
  act_rec_id: number;

  @Column()
  act_rec_qty: number;

  @Column({ type: 'real' })
  act_rec_total_price: number;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;

  @ManyToOne(() => Booking, (booking) => booking.activityPer)
  booking: Booking;

  @ManyToOne(() => Activity, (activity) => activity.activityPer)
  activity: Activity;
}
