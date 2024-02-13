import { ReceiptDetail } from "src/receipts/entities/receiptdetail.entity";
import { Entity, PrimaryGeneratedColumn , Column, OneToOne, JoinColumn, OneToMany, ManyToOne } from "typeorm";

@Entity()
export class Brokenequipment {
  @PrimaryGeneratedColumn()
  bro_ep_id: number;

  @Column()
  bro_ep_name: string;

  @Column()
  bro_ep_qty: number;

  @Column()
  bro_ep_note: string;

  @OneToMany (() => ReceiptDetail , (receiptdetail) => receiptdetail.brokenequipment)
  receiptdetail: ReceiptDetail[];

}