import { Checkinandout } from "src/checkinandout/entities/checkinandout.entity";
import { Receipt } from "src/receipts/entities/receipt.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn , Column,OneToOne ,JoinColumn, OneToMany, ManyToOne} from "typeorm";

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

  @OneToOne(() => User, (user) => user.employee)
  @JoinColumn()
    user: User

  @OneToMany (() => Checkinandout , (checkinandout) => checkinandout.employee)
  checkinandout: Checkinandout[];

  @OneToMany (() => Receipt , (receipt) => receipt.employee)
  receipt: Receipt[];
}
