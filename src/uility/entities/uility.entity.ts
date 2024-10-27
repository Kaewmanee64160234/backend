import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Employee } from 'src/employees/entities/employee.entity';

@Entity()
export class Uility {
  @PrimaryGeneratedColumn()
  ue_id: number;

  @Column({ type: 'real' })
  ue_water: number;

  @Column({ type: 'real' })
  ue_electric: number;

  @Column({ type: 'real' })
  ue_total: number;

  @Column({ nullable: true, type: 'text' })
  ue_paid_status: string;

  @Column({ nullable: true, type: 'real' })
  ue_price: number;

  @Column({ nullable: true })
  ue_other: string;

  @Column({ nullable: true })
  ue_date: Date;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;

  @ManyToOne(() => Employee, (employee) => employee.uility)
  employee: Employee;
}
