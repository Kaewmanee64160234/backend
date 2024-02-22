import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Customer } from 'src/customers/entities/customer.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { Promotion } from 'src/promotions/entities/promotion.entity';
import { BookingDetail } from './bookingDetail';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  booking_id: number;

  @CreateDateColumn()
  booking_create_date: Date;

  @Column({ type: 'text' })
  booking_cus_name: string;

  @Column({ type: 'text' })
  booking_cus_lastname: string;

  @Column({ type: 'text' })
  booking_cus_tel: string;

  @Column({ type: 'text' })
  booking_cus_email: string;

  @Column({ type: 'text' })
  booking_cus_addr: string;

  @Column({ type: 'text' })
  booking_cus_addr_des: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP', nullable: true })
  booking_checkin: Date;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  booking_checkout: Date;

  @Column({ type: 'real', nullable: true })
  booking_total: number;

  @Column({ default: 0, type: 'real' })
  booking_cash_pledge: number;

  @Column({ default: 0, type: 'real', nullable: true })
  booking_total_discount: number;

  @Column({ default: 'cash', type: 'text' })
  booking_payment_booking: string;

  @Column({ default: 'cash', type: 'text', nullable: true })
  booking_payment_checkout: string;

  @Column({ default: 'Not Comfrim', type: 'text', nullable: true })
  booking_status: string;

  @Column({ default: 'Not Comfrim', type: 'text', nullable: true })
  booking_status_late: string;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;

  @OneToMany(() => BookingDetail, (bookingetail) => bookingetail.booking)
  bookingDetail: BookingDetail[];

  @ManyToOne(() => Customer, (customer) => customer.booking)
  customer: Customer;

  @ManyToOne(() => Employee, (employee) => employee.bookings)
  employee: Employee;

  @ManyToOne(() => Promotion, (promotion) => promotion.booking)
  promotion: Promotion;
}
