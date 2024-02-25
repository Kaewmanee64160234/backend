import { Roomtype } from 'src/roomtypes/entities/roomtype.entity';

export class CreateRoomDto {
  room_id?: string;

  room_img_path: string;

  room_status: string;

  rooom_roomtype_id: number;
}
