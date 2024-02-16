import { Checkinandout } from "src/checkinandout/entities/checkinandout.entity";
import { Receipt } from "src/receipts/entities/receipt.entity";
import { Uility } from "src/uility/entities/uility.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn , Column,OneToOne ,JoinColumn, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn} from "typeorm";

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  emp_id: number;

  @Column()
  emp_name: string;

  @Column()
  emp_position: string;

  @Column()
  emp_tel: string;

  @Column()
  emp_dob: string;

  @Column()
  emp_addr: string;

  @Column()
  emp_email: string;

  @Column()
  emp_dsw: Date;

  @Column()
  emp_hourly_wage: Date;

  @CreateDateColumn()
  createDate : Date

  @UpdateDateColumn()
  updateDate : Date

  @DeleteDateColumn()
  deleteDate : Date

  @OneToOne(() => User, (user) => user.employee)
  @JoinColumn()
    user: User

  @OneToMany (() => Checkinandout , (checkinandout) => checkinandout.employee)
  checkinandout: Checkinandout[];

  @OneToMany (() => Receipt , (receipt) => receipt.employee)
  receipt: Receipt[];

  @OneToMany (() => Uility , (uility) => uility.employee)
  uility: Uility[];
}
