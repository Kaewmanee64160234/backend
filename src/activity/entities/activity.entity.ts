import { Activityper } from 'src/activityper/entities/activityper.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  act_id: number;

  @Column({ type: 'varchar', length: 255 })
  act_img_path: string;

  @Column({ type: 'varchar', length: 100 })
  act_name: string;

  @Column({ type: 'float' })
  act_price: number;

  @Column({ nullable: true, type: 'text' })
  act_des: string;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;

  @OneToMany(() => Activityper, (activityPer) => activityPer.activity)
  activityPer: Activityper[];
}
