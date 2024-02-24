import { Booking } from 'src/booking/entities/booking.entity';
import { Checkinandout } from 'src/checkinandout/entities/checkinandout.entity';
import { Uility } from 'src/uility/entities/uility.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  emp_id: number;

  @Column({ type: 'text' })
  emp_name: string;

  @Column({ type: 'text' })
  emp_position: string;

  @Column({ unique: true, type: 'text' })
  emp_tel: string;

  @Column()
  emp_dob: Date;

  @Column({ type: 'text' })
  emp_addr: string;

  @Column({ unique: true, type: 'text' })
  emp_email: string;

  @Column()
  emp_dsw: Date;

  @Column({ type: 'real' })
  emp_hourly_wage: number;

  @DeleteDateColumn()
  deleteDate: Date;

  @OneToOne(() => User, (user) => user.employee)
  @JoinColumn()
  user: User;

  @OneToMany(() => Checkinandout, (checkinandout) => checkinandout.employee)
  checkinandout: Checkinandout[];

  @OneToMany(() => Booking, (booking) => booking.employee)
  bookings: Booking[];

  @OneToMany(() => Uility, (uility) => uility.employee)
  uility: Uility[];
}
