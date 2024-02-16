import { Customer } from "src/customers/entities/customer.entity";
import { Employee } from "src/employees/entities/employee.entity";
import { Entity, PrimaryGeneratedColumn , Column, OneToOne, JoinColumn, OneToMany, ManyToOne , CreateDateColumn , DeleteDateColumn , UpdateDateColumn  } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  user_name: string;

  @Column()
  user_login: string;

  @Column()
  user_password: string;

  @Column()
  user_role: string;

  @CreateDateColumn()
  createDate : Date

  @UpdateDateColumn()
  updateDate : Date

  @DeleteDateColumn()
  deleteDate : Date

  @OneToOne(() => Customer, (customer) => customer.user)
  @JoinColumn()
  customer: Customer

  @OneToOne(() => Employee, (employee) => employee.user)
  @JoinColumn()
  employee: Employee


}