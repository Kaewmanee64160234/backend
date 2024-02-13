import { ReceiptDetail } from "src/receipts/entities/receiptdetail.entity";
import { Entity, PrimaryGeneratedColumn , Column , OneToOne , JoinColumn, OneToMany, ManyToOne } from "typeorm";

@Entity()
export class Activity {
@PrimaryGeneratedColumn()
  act_id: number;

  @Column()
  act_name: string;

  @Column()
  act_price: number;

  @Column()
  act_des: string;

  // @ManyToOne (() => ReceiptDetail, (receiptdetail) => receiptdetail.activity)
  // receiptdetail : ReceiptDetail;
  
}
