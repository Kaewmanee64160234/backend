import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
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
