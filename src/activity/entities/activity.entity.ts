import { Entity, PrimaryGeneratedColumn , Column , OneToOne , JoinColumn } from "typeorm";

@Entity()
export class Activity {
@PrimaryGeneratedColumn()
  act_id: number;

  @Column()
  act_name: string;

  @Column()
  act_price: number;

  @Column()
  act_des: string;
  
}
