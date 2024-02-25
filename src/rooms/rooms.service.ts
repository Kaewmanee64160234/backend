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

  create(createRoomtypeDto: CreateRoomDto) {
    const room = this.roomsRepository.save(createRoomtypeDto);
    if (!room) {
      throw new NotFoundException();
    }
    return room;
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

  async getRoomByType(roomstatus: string) {
    // , roomTypeName: string
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
