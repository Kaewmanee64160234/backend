import { Employee } from "src/employees/entities/employee.entity";
import { Entity, PrimaryGeneratedColumn , Column, OneToOne, JoinColumn, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity()
export class Uility {
  @PrimaryGeneratedColumn()
  ue_id: number;

  @Column()
  ue_water: number;

  @Column()
  ue_electric: number;

  @Column()
  ue_total: number;

  @Column()
  ue_paid_status: string;

  @Column()
  ue_price: number;

  @Column()
  ue_other: string;

  @Column()
  ue_date: Date;

  @CreateDateColumn()
  createDate : Date

  @UpdateDateColumn()
  updateDate : Date

  @DeleteDateColumn()
  deleteDate : Date

  @ManyToOne (() => Employee, (employee) => employee.uility)
  employee : Employee;
}
