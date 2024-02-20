import { time } from 'console';
import { Employee } from 'src/employees/entities/employee.entity';
import { Salary } from 'src/salary/entities/salary.entity';
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

@Entity()
export class Checkinandout {
  @PrimaryGeneratedColumn()
  cio_id: number;

  @Column()
  cio_date: Date;

  @Column()
  cio_time_in: Date;

  // @Column({ type: 'time' })
  // cio_time_in: string;

  @Column()
  cio_time_out: Date;

  // @Column({ type: 'time' })
  // cio_time_out: string;

  @Column()
  cio_total_hour: Date;

  // @Column()
  // cio_total_hour: string;

  @Column({ nullable: true, type: 'text' })
  cio_paid_status: string;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;

  @ManyToOne(() => Salary, (salary) => salary.checkinandout)
  salary: Salary;

  @ManyToOne(() => Employee, (employee) => employee.checkinandout)
  employee: Employee;
}
