import { Room } from 'src/rooms/entities/room.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Roomtype {
  @PrimaryGeneratedColumn()
  room_type_id: number;

  @Column({ nullable: true, type: 'text' })
  room_type: string;

  @Column({ nullable: true, type: 'text' })
  room_type_name: string;

  @Column({ type: 'real' })
  room_type_price: number;

  @Column({ nullable: true, type: 'text' })
  room_type_des: string;

  @Column({ nullable: true, type: 'text' })
  room_type_bed_size: string;

  @Column({ nullable: true })
  room_type_chromecast: boolean;

  @Column({ nullable: true })
  room_type_electric_sheer: boolean;

  @Column({ nullable: true })
  room_type_bath: boolean;

  @Column({ nullable: true })
  room_type_wifi: boolean;

  @Column({ nullable: true })
  room_type_water: boolean;

  @Column({ nullable: true })
  room_type_desk: boolean;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;

  @OneToMany(() => Room, (room) => room.roomtype)
  room: Room[];
}
