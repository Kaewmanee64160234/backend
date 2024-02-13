import { Review } from "src/reviews/entities/review.entity";
import { Entity, PrimaryColumn , Column,OneToOne ,JoinColumn, OneToMany, ManyToOne} from "typeorm";

@Entity()
export class Room {
  @PrimaryColumn()
  room_id: number;

  @Column()
  room_type: string;

  @Column()
  room_des: string;

  @Column()
  room_bed_size: string;

  @Column()
  room_status: string;

  @OneToMany (() => Review , (review) => review.room)
  review: Review[];
}
