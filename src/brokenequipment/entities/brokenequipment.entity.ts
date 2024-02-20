import { ReceiptDetail } from "src/receipts/entities/receiptdetail.entity";
import { Entity, PrimaryGeneratedColumn , Column, OneToOne, JoinColumn, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity()
export class Brokenequipment {
  @PrimaryGeneratedColumn()
  bro_ep_id: number;

  @Column({ nullable: true, type: 'text' })
  bro_ep_name: string;

  @Column()
  bro_ep_qty: number;

  @Column({ nullable: true, type: 'text' })
  bro_ep_note: string;

  @CreateDateColumn()
  createDate : Date

  @UpdateDateColumn()
  updateDate : Date

  @DeleteDateColumn()
  deleteDate : Date

  @OneToMany (() => ReceiptDetail , (receiptdetail) => receiptdetail.brokenequipment)
  receiptdetail: ReceiptDetail[];

}