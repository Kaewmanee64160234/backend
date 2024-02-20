import { Entity, PrimaryGeneratedColumn , Column, OneToOne, JoinColumn, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { ReceiptDetail } from "./receiptdetail.entity";
import { Customer } from "src/customers/entities/customer.entity";
import { Employee } from "src/employees/entities/employee.entity";
import { Promotion } from "src/promotions/entities/promotion.entity";

@Entity()
export class Receipt {
  @PrimaryGeneratedColumn()
  rec_id: number;

  @CreateDateColumn()
  rec_create_date: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' , nullable: true})
  rec_checkin: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' , nullable: true})
  rec_checkout: Date;

  @Column({type: 'real' , nullable: true})
  rec_total: number;

  @Column({ default: 0 ,type: 'real'})
  rec_cash_pledge: number;

  @Column({ default: 0 ,type: 'real'})
  rec_total_discount: number;

  @Column({ default: "cash" ,type: 'text', nullable: true})
  rec_payment_booking: string;

  @Column({ default: "cash" ,type: 'text', nullable: true})
  rec_payment_checkout: string;

  @Column({ default: "Not Comfrim" ,type: 'text', nullable: true})
  rec_status: string;

  @Column({ default: false ,type: 'text', nullable: true})
  rec_status_late: boolean;

  @UpdateDateColumn()
  updateDate : Date

  @DeleteDateColumn()
  deleteDate : Date

  @OneToMany (() => ReceiptDetail , (receiptdetail) => receiptdetail.receipt)
  receiptdetail: ReceiptDetail[];

  @ManyToOne (() => Customer, (customer) => customer.receipt)
  customer: Customer;

  @ManyToOne (() => Employee, (employee) => employee.receipt)
  employee: Employee;

  @ManyToOne (() => Promotion, (promotion) => promotion.receipt)
  promotion: Promotion;

}