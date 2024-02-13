import { Activity } from "src/activity/entities/activity.entity";
import { Entity, PrimaryGeneratedColumn , Column, OneToOne, JoinColumn, OneToMany, ManyToOne } from "typeorm";
import { Receipt } from "./receipt.entity";

@Entity()
export class ReceiptDetail {
  @PrimaryGeneratedColumn()
  recd_id: number;

  @Column()
  recd_total_price: number;

  @Column()
  recd_adult: string;

  @Column()
  recd_child: string;

  @OneToMany (() => Activity , (activity) => activity.receiptdetail)
  activity: Activity[];

  @ManyToOne (() => Receipt, (receipt) => receipt.receiptdetail)
  receipt : Receipt;

}