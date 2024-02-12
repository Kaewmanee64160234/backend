import { Entity, PrimaryGeneratedColumn , Column, OneToOne, JoinColumn } from "typeorm";

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

}
