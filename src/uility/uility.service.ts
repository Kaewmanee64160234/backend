import { Injectable } from '@nestjs/common';
import { CreateUilityDto } from './dto/create-uility.dto';
import { UpdateUilityDto } from './dto/update-uility.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Uility } from './entities/uility.entity';

@Injectable()
export class UilityService {

  constructor(
    @InjectRepository(Uility)
    private uilityRepository: Repository<Uility>,
  ) {}

  create(createUilityDto: CreateUilityDto) {
    return 'This action adds a new uility';
  }

  findAll() {
    return this.uilityRepository.find({ relations: ['employee']});
  }

  findOne(id: number) {
    return `This action returns a #${id} uility`;
  }

  update(id: number, updateUilityDto: UpdateUilityDto) {
    return `This action updates a #${id} uility`;
  }

  remove(id: number) {
    return `This action removes a #${id} uility`;
  }
}
