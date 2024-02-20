import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomserviceDto } from './dto/create-roomservice.dto';
import { UpdateRoomserviceDto } from './dto/update-roomservice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Roomservice } from './entities/roomservice.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomserviceService {

  constructor(
    @InjectRepository(Roomservice)
    private roomserviceRepository: Repository<Roomservice>,
  ) {}

  create(createRoomserviceDto: CreateRoomserviceDto) {
    const roomservice = this.roomserviceRepository.save(createRoomserviceDto);
    if(!roomservice){
      throw new NotFoundException();
    }
    return roomservice
  }

  findAll() {
    return this.roomserviceRepository.find({ relations: ['receiptdetail']});
  }

  async findOne(id: number) {
    const roomservice = await this.roomserviceRepository.findOne({ where: { room_ser_id: id } , relations: ['receiptdetail'] });
    if (!roomservice){
      throw new NotFoundException();
    }
    return roomservice
  }

  async update(id: number, updateRoomserviceDto: UpdateRoomserviceDto) {
    const roomservice = await this.roomserviceRepository.findOneBy({room_ser_id :id})
    if(!roomservice){
      throw new NotFoundException();
    }
    const updatedRoomservice = {...roomservice,...updateRoomserviceDto};
    return this.roomserviceRepository.save(updatedRoomservice);
  }

  async remove(id: number) {
    const roomservice = await this.roomserviceRepository.findOneBy({room_ser_id :id})
    if(!roomservice){
      throw new NotFoundException();
    }
    return this.roomserviceRepository.softRemove(roomservice);
  }
}
