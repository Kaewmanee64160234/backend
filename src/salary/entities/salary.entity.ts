import { Entity, PrimaryGeneratedColumn , Column, OneToOne, JoinColumn, OneToMany, ManyToOne } from "typeorm";

@Entity()
export class Salary {
  @PrimaryGeneratedColumn()
  ss_id: number;

  @Column()
  ss_date: Date;

  @Column()
  ss_work_hour: Date;

  @Column()
  ss_salary: number;

  @Column()
  ss_paid_status: string;
}