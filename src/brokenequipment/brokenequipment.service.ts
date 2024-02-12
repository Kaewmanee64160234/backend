import { Injectable } from '@nestjs/common';
import { CreateBrokenequipmentDto } from './dto/create-brokenequipment.dto';
import { UpdateBrokenequipmentDto } from './dto/update-brokenequipment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brokenequipment } from './entities/brokenequipment.entity';

@Injectable()
export class BrokenequipmentService {

  constructor(
    @InjectRepository(Brokenequipment)
    private brokenequipmentsRepository: Repository<Brokenequipment>,
  ) {}

  create(createBrokenequipmentDto: CreateBrokenequipmentDto) {
    return 'This action adds a new brokenequipment';
  }

  findAll() {
    return this.brokenequipmentsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} brokenequipment`;
  }

  update(id: number, updateBrokenequipmentDto: UpdateBrokenequipmentDto) {
    return `This action updates a #${id} brokenequipment`;
  }

  remove(id: number) {
    return `This action removes a #${id} brokenequipment`;
  }
}
