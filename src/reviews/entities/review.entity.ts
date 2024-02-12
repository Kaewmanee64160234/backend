import { Entity, PrimaryGeneratedColumn , Column, OneToOne, JoinColumn } from "typeorm";

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  rev_id: number;

  @Column()
  rev_name: string;

  @Column()
  rev_star_clean: string;

  @Column()
  rev_star_service: string;

  @Column()
  rev_star_conv: string;

  @Column()
  rev_comment: string;

  @Column()
  rev_date: Date;

}