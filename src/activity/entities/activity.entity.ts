import { Activityper } from 'src/activityper/entities/activityper.entity';
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
export class Activity {
  @PrimaryGeneratedColumn()
  act_id: number;

  @Column({ type: 'text' })
  act_img_path: string;

  @Column({ type: 'text' })
  act_name: string;

  @Column({ type: 'real' })
  act_price: number;

  @Column({ nullable: true, type: 'text' })
  act_des: string;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;

  @OneToMany(() => Activityper, (activityPer) => activityPer.activity)
  activityPer: Activityper[];
}
