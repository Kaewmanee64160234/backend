import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Roomtype } from 'src/roomtypes/entities/roomtype.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
    @InjectRepository(Roomtype)
    private roomstypeRepository: Repository<Roomtype>,
  ) {}

  async create(createRoomtypeDto: CreateRoomDto) {
    const typeRoom = await this.roomstypeRepository.findOne({
      where: { room_type_id: createRoomtypeDto.rooom_roomtype_id },
    });
    const room = new Room();
    room.room_id = createRoomtypeDto.room_id;
    room.room_img_path = createRoomtypeDto.room_img_path;
    room.room_status = 'ready';
    room.roomtype = typeRoom;
    const room_ = this.roomsRepository.save(room);
    if (!room_) {
      throw new NotFoundException();
    }
    return room_;
  }

  findAll() {
    return this.roomsRepository.find({ relations: ['roomtype'] });
  }

  async findOne(id: string) {
    const room = await this.roomsRepository.findOne({
      where: { room_id: id },
      relations: ['roomtype'],
    });
    if (!room) {
      throw new NotFoundException();
    }
    return room;
  }

  async getRoomByType(roomstatus: string, roomTypeName: string) {
    const room = await this.roomsRepository.find({
      where: { room_status: roomstatus },
      relations: ['roomtype'],
      join: {
        alias: 'room',
        leftJoinAndSelect: {
          roomtype: 'room.roomtype',
        },
      },
    });

    if (!room || room.length === 0) {
      throw new NotFoundException('Room not found');
    }

    return room;
  }

  async update(id: string, updateRoomDto: UpdateRoomDto) {
    const room = await this.roomsRepository.findOneBy({ room_id: id });
    if (!room) {
      throw new NotFoundException();
    }
    const updatedRoom = { ...room, ...updateRoomDto };
    return this.roomsRepository.save(updatedRoom);
  }

  async remove(id: string) {
    const room = await this.roomsRepository.findOneBy({ room_id: id });
    if (!room) {
      throw new NotFoundException();
    }
    return this.roomsRepository.softRemove(room);
  }
}
