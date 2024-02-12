import { User } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn , Column,OneToOne ,JoinColumn} from "typeorm";

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
}
