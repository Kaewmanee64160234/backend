import { Receipt } from "src/receipts/entities/receipt.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn , Column , OneToOne , JoinColumn, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  cus_id: number;

  @Column({type: "text"})
  cus_name: string;

  @CreateDateColumn()
  cus_start_date: Date;

  @OneToOne(() => User, (user) => user.customer)
  @JoinColumn()
  user: User

  @OneToMany (() => Receipt , (receipt) => receipt.customer)
  receipt: Receipt[];
}
