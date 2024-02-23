import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository, getRepository } from 'typeorm';
import { Room } from './entities/room.entity';
import { Roomtype } from 'src/roomtypes/entities/roomtype.entity';

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

  async getRoomByType(roomstatus: string, roomTypeName: string) {
    const room = await this.roomsRepository.findOne({
      where: { room_status: roomstatus },
      relations: ['roomtype'],
      join: {
        alias: 'room',
        leftJoinAndSelect: {
          roomtype: 'room.roomtype',
        },
      },
    });

    if (!room || room.roomtype.room_type_name !== roomTypeName) {
      throw new NotFoundException('Room not found');
    }

    return room;
  }

  // async getRoomByTypeId(roomstatus: string, roomTypeId: number) {
  //   const room = await getRepository(Room)
  //     .createQueryBuilder('room')
  //     .leftJoinAndSelect('room.roomtype', 'roomtype')
  //     .where('room.room_status = :roomstatus', { roomstatus })
  //     .andWhere('roomtype.room_type_id = :roomTypeId', { roomTypeId })
  //     .getOne();

  //   if (!room) {
  //     throw new NotFoundException('Room not found');
  //   }

  //   return room;
  // }

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
