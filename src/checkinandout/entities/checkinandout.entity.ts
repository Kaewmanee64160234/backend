import { Entity, PrimaryGeneratedColumn , Column, OneToOne, JoinColumn, OneToMany, ManyToOne } from "typeorm";

@Entity()
export class Checkinandout {
  @PrimaryGeneratedColumn()
  cio_id: number;

  @Column()
  cio_date: Date;

  @Column()
  cio_time_in: Date;

  @Column()
  cio_time_out: Date;

  @Column()
  cio_total_hour: Date;

  @Column()
  cio_paid_status: string;
}
