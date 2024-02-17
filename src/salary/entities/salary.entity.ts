import { Checkinandout } from "src/checkinandout/entities/checkinandout.entity";
import { Entity, PrimaryGeneratedColumn , Column, OneToOne, JoinColumn, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

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

  @CreateDateColumn()
  createDate : Date

  @UpdateDateColumn()
  updateDate : Date

  @DeleteDateColumn()
  deleteDate : Date

  @OneToMany (() => Checkinandout , (checkinandout) => checkinandout.salary)
  checkinandout: Checkinandout[];
}