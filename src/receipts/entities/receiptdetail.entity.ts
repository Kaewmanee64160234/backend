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
import { Receipt } from './receipt.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Brokenequipment } from 'src/brokenequipment/entities/brokenequipment.entity';
import { Roomservice } from 'src/roomservice/entities/roomservice.entity';
import { Review } from 'src/reviews/entities/review.entity';

@Entity()
export class ReceiptDetail {
  @PrimaryGeneratedColumn()
  recd_id: number;

  @Column({ type: 'real', nullable: true })
  recd_total_price: number;

  @Column({ default: 0, nullable: true })
  recd_adult: number;

  @Column({ default: 0, nullable: true })
  recd_child: number;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;

  // @OneToMany(() => Activity, (activity) => activity.receiptdetail)
  // activity: Activity[];

  // @OneToMany(() => Roomservice, (roomservice) => roomservice.receiptdetail)
  // roomservice: Roomservice[];

  // @OneToMany(() => Review, (review) => review.receiptdetail)
  // review: Review[];

  // @ManyToOne(() => Receipt, (receipt) => receipt.receiptdetail)
  // receipt: Receipt;

  // @ManyToOne(() => Room, (room) => room.receiptdetail)
  // room: Room;

  // @ManyToOne(
  //   () => Brokenequipment,
  //   (brokenequipment) => brokenequipment.receiptdetail,
  // )
  // brokenequipment: Brokenequipment;
}
