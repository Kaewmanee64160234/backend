import { Employee } from "src/employees/entities/employee.entity";
import { Salary } from "src/salary/entities/salary.entity";
import { Entity, PrimaryGeneratedColumn , Column, OneToOne, JoinColumn, OneToMany, ManyToOne } from "typeorm";

@Entity()
export class Checkinandout {
  @PrimaryGeneratedColumn()
  cio_id: number;

  @Column()
  cio_date: Date;

  @Column()
  cio_time_in: Date;

  @Column()
  cio_time_out: Date;

  @Column()
  cio_total_hour: Date;

  @Column()
  cio_paid_status: string;

  @ManyToOne (() => Salary, (salary) => salary.checkinandout)
  salary : Salary;

  @ManyToOne (() => Employee, (employee) => employee.checkinandout)
  employee : Employee;
}
