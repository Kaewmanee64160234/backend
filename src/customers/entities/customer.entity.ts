import { User } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn , Column , OneToOne , JoinColumn } from "typeorm";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  cus_id: number;

  @Column()
  cus_name: string;

  @Column()
  cus_tel: string;

  @Column()
  cus_point: number;

  @Column()
  cus_start_date: Date;

  @OneToOne(() => User, (user) => user.customer)
  @JoinColumn()
  user: User
}
