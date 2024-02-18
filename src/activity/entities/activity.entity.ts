import { ReceiptDetail } from "src/receipts/entities/receiptdetail.entity";
import { Entity, PrimaryGeneratedColumn , Column , OneToOne , JoinColumn, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity()
export class Activity {
@PrimaryGeneratedColumn()
  act_id: number;

  @Column({ type: 'text' })
  act_name: string;

  @Column({ type: 'real' })
  act_price: number;

  @Column({ nullable: true, type: 'text' })
  act_des: string;

  @CreateDateColumn()
  createDate : Date

  @UpdateDateColumn()
  updateDate : Date

  @DeleteDateColumn()
  deleteDate : Date

  @ManyToOne (() => ReceiptDetail, (receiptdetail) => receiptdetail.activity)
  receiptdetail : ReceiptDetail;
  
}
