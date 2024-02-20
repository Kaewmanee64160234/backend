import { Receipt } from "src/receipts/entities/receipt.entity";
import { Entity, PrimaryGeneratedColumn , Column, OneToOne, JoinColumn, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity()
export class Promotion {
  @PrimaryGeneratedColumn()
  prom_id: number;

  @Column()
  prom_created_date: Date;

  @Column()
  prom_end_date: Date;

  @Column({type: 'text', nullable: true})
  prom_name: string;

  @Column({type: 'real', nullable: true})
  prom_discount: number;

  @Column({nullable: true})
  prom_discount_pres: number;

  @Column()
  prom_used_point: number;

  @CreateDateColumn()
  createDate : Date

  @UpdateDateColumn()
  updateDate : Date

  @DeleteDateColumn()
  deleteDate : Date

  @OneToMany (() => Receipt , (receipt) => receipt.promotion)
  receipt: Receipt[];
}
