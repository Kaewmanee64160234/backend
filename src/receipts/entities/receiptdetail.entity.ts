import { Entity, PrimaryGeneratedColumn , Column, OneToOne, JoinColumn } from "typeorm";

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

}