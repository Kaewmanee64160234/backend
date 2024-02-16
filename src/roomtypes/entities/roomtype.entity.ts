import { Room } from "src/rooms/entities/room.entity";
import { Entity, PrimaryGeneratedColumn , Column , OneToOne , JoinColumn , OneToMany, ManyToOne, DeleteDateColumn, UpdateDateColumn, CreateDateColumn} from "typeorm";

@Entity()
export class Roomtype {
@PrimaryGeneratedColumn()
    room_type_id : number;

    @Column()
    room_type : string;

    @Column()
    room_type_name: string;

    @Column()
    room_type_price: string;

    @Column()
    room_type_bed_size: string;

    @Column()
    room_type_chromecast: string;

    @Column()
    room_type_electric_sheer: string;

    @Column()
    room_type_bath: string;

    @Column()
    room_type_wifi: string;

    @Column()
    room_type_water: string;

    @Column()
    room_type_desk: string;

    @CreateDateColumn()
    createDate : Date

   @UpdateDateColumn()
   updateDate : Date

   @DeleteDateColumn()
   deleteDate : Date

   @OneToMany (() => Room , (room) => room.roomtype)
   room: Room[];

}
