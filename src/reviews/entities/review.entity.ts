import { ReceiptDetail } from 'src/receipts/entities/receiptdetail.entity';
import { Room } from 'src/rooms/entities/room.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  rev_id: number;

  @Column({ type: 'text', nullable: true })
  rev_name: string;

  @Column({ nullable: true })
  rev_star_clean: string;
  // @Column({nullable : true})
  // rev_star_clean: number;

  @Column({ nullable: true })
  rev_star_service: string;
  // @Column({nullable : true})
  // rev_star_service: number;

  @Column({ nullable: true })
  rev_star_conv: string;
  // @Column({nullable : true})
  // rev_star_conv: number;

  @Column({ type: 'text', nullable: true })
  rev_comment: string;

  @Column()
  rev_date: Date;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;

  @ManyToOne(() => Room, (room) => room.review)
  room: Room;

  @ManyToOne(() => ReceiptDetail, (receiptdetail) => receiptdetail.review)
  receiptdetail: ReceiptDetail;
}
