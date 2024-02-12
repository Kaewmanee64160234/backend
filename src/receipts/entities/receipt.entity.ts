import { Entity, PrimaryGeneratedColumn , Column, OneToOne, JoinColumn } from "typeorm";

@Entity()
export class Receipt {
  @PrimaryGeneratedColumn()
  rec_id: number;

  @Column()
  rec_create_date: Date;

  @Column()
  rec_checkin: Date;

  @Column()
  rec_checkout: Date;

  @Column()
  rec_total: number;

  @Column()
  rec_cash_pledge: number;

  @Column()
  rec_total_discount: number;

  @Column()
  rec_payment_booking: string;

  @Column()
  rec_payment_checkout: string;

  @Column()
  rec_status: string;

  @Column()
  rec_status_late: string;

}