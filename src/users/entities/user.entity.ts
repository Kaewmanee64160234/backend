import { IsEmail, Length } from 'class-validator';
import { Customer } from 'src/customers/entities/customer.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: 'text' })
  @Length(8, 20)
  user_name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  @IsEmail()
  user_login: string;

  @Column({ type: 'text' })
  user_password: string;

  @Column({ type: 'text' })
  user_role: string;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;

  @OneToOne(() => Customer, (customer) => customer.user, { nullable: true })
  @JoinColumn()
  customer: Customer | null;

  @OneToOne(() => Employee, (employee) => employee.user, { nullable: true })
  @JoinColumn()
  employee: Employee | null;
}
