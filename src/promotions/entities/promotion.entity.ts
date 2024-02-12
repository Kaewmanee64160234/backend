import { Entity, PrimaryGeneratedColumn , Column, OneToOne, JoinColumn } from "typeorm";

@Entity()
export class Promotion {
  @PrimaryGeneratedColumn()
  prom_id: number;

  @Column()
  prom_created_date: Date;

  @Column()
  prom_end_date: Date;

  @Column()
  prom_name: string;

  @Column()
  prom_discount: number;

  @Column()
  prom_discount_pres: number;

  @Column()
  prom_used_point: number;
}
