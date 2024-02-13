import { Entity, PrimaryGeneratedColumn , Column, OneToOne, JoinColumn, OneToMany, ManyToOne } from "typeorm";
import { ReceiptDetail } from "./receiptdetail.entity";
import { Customer } from "src/customers/entities/customer.entity";
import { Employee } from "src/employees/entities/employee.entity";
import { Promotion } from "src/promotions/entities/promotion.entity";

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

  @OneToMany (() => ReceiptDetail , (receiptdetail) => receiptdetail.receipt)
  receiptdetail: ReceiptDetail[];

  @ManyToOne (() => Customer, (customer) => customer.receipt)
  customer: Customer;

  @ManyToOne (() => Employee, (employee) => employee.receipt)
  employee: Employee;

  @ManyToOne (() => Promotion, (promotion) => promotion.receipt)
  promotion: Promotion;

}