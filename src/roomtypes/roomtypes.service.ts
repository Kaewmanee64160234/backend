import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomtypeDto } from './dto/create-roomtype.dto';
import { UpdateRoomtypeDto } from './dto/update-roomtype.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Roomtype } from './entities/roomtype.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomtypesService {
  constructor(
    @InjectRepository(Roomtype)
    private roomtypesRepository: Repository<Roomtype>,
  ) {}

  create(createRoomtypeDto: CreateRoomtypeDto) {
    const roomtype = this.roomtypesRepository.save(createRoomtypeDto);
    if (!roomtype) {
      throw new NotFoundException();
    }
    return roomtype;
  }

  findAll() {
    return this.roomtypesRepository.find();
  }

  async findOne(id: number) {
    const roomtype = await this.roomtypesRepository.findOne({
      where: { room_type_id: id },
    });
    if (!roomtype) {
      throw new NotFoundException();
    }
    return roomtype;
  }

  async update(id: number, updateRoomtypeDto: UpdateRoomtypeDto) {
    const roomtype = await this.roomtypesRepository.findOneBy({
      room_type_id: id,
    });
    if (!roomtype) {
      throw new NotFoundException();
    }
    const updatedRoomtypes = { ...roomtype, ...updateRoomtypeDto };
    return this.roomtypesRepository.save(updatedRoomtypes);
  }

  async remove(id: number) {
    const roomtype = await this.roomtypesRepository.findOneBy({
      room_type_id: id,
    });
    if (!roomtype) {
      throw new NotFoundException();
    }
    return this.roomtypesRepository.softRemove(roomtype);
  }

  async getTypeRoom(roomtype_: string) {
    const roomtype = await this.roomtypesRepository.findOne({
      where: { room_type: roomtype_ },
    });
    if (!roomtype) {
      throw new NotFoundException('RoomType not found');
    }
    return roomtype;
  }
}
