import { ReceiptDetail } from "src/receipts/entities/receiptdetail.entity";
import { Entity, PrimaryGeneratedColumn , Column , OneToOne , JoinColumn , OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn} from "typeorm";

@Entity()
export class Roomservice {
@PrimaryGeneratedColumn()
  room_ser_id: number;

  @Column()
  room_ser_type: string;

  @Column()
  room_ser_name: string;

  @Column()
  room_ser_price: number;

  @Column()
  room_ser_timedel: Date;

  @Column()
  room_ser_datedel: Date;

  @CreateDateColumn()
  createDate : Date

  @UpdateDateColumn()
  updateDate : Date

  @DeleteDateColumn()
  deleteDate : Date

  @ManyToOne (() => ReceiptDetail, (receiptdetail) => receiptdetail.roomservice)
  receiptdetail : ReceiptDetail;

}
