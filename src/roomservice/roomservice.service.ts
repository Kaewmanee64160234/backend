import { Injectable } from '@nestjs/common';
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
    return 'This action adds a new roomservice';
  }

  findAll() {
    return this.roomserviceRepository.find({ relations: ['receiptdetail']});
  }

  findOne(id: number) {
    return `This action returns a #${id} roomservice`;
  }

  update(id: number, updateRoomserviceDto: UpdateRoomserviceDto) {
    return `This action updates a #${id} roomservice`;
  }

  remove(id: number) {
    return `This action removes a #${id} roomservice`;
  }
}
