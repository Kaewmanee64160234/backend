import { ReceiptDetail } from "src/receipts/entities/receiptdetail.entity";
import { Review } from "src/reviews/entities/review.entity";
import { Roomtype } from "src/roomtypes/entities/roomtype.entity";
import { Entity, PrimaryColumn , Column,OneToOne ,JoinColumn, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn} from "typeorm";

@Entity()
export class Room {
  @PrimaryColumn()
  room_id: number;


  @Column()
  room_des: string;

  @Column()
  room_status: string;

  @CreateDateColumn()
  createDate : Date

  @UpdateDateColumn()
  updateDate : Date

  @DeleteDateColumn()
  deleteDate : Date

  @OneToMany (() => Review , (review) => review.room)
  review: Review[];

  @OneToMany (() => ReceiptDetail , (receiptdetail) => receiptdetail.room)
  receiptdetail: ReceiptDetail[];

  @ManyToOne (() => Roomtype, (roomtype) => roomtype.room)
  roomtype : Roomtype;
}
