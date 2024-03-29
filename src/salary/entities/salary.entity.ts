import { Checkinandout } from 'src/checkinandout/entities/checkinandout.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Salary {
  @PrimaryGeneratedColumn()
  ss_id: number;

  @Column()
  ss_date: Date;

  @Column()
  ss_work_hour: number;

  @Column({ type: 'real' })
  ss_salary: number;

  @Column({ nullable: true, type: 'text' })
  ss_paid_status: string;

  @DeleteDateColumn()
  deleteDate: Date;

  @OneToMany(() => Checkinandout, (checkinandout) => checkinandout.salary)
  checkinandout: Checkinandout[];
}
