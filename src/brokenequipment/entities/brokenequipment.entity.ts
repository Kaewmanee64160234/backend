import { Entity, PrimaryGeneratedColumn , Column, OneToOne, JoinColumn } from "typeorm";

@Entity()
export class Brokenequipment {
  @PrimaryGeneratedColumn()
  bro_ep_id: number;

  @Column()
  bro_ep_name: string;

  @Column()
  bro_ep_qty: number;

  @Column()
  bro_ep_note: string;

}