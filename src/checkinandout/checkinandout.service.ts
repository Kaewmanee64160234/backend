import { Injectable } from '@nestjs/common';
import { CreateCheckinandoutDto } from './dto/create-checkinandout.dto';
import { UpdateCheckinandoutDto } from './dto/update-checkinandout.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Checkinandout } from './entities/checkinandout.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CheckinandoutService {

  constructor(
    @InjectRepository(Checkinandout)
    private checkinandoutRepository: Repository<Checkinandout>,
  ) {}

  create(createCheckinandoutDto: CreateCheckinandoutDto) {
    return 'This action adds a new checkinandout';
  }

  findAll() {
    return this.checkinandoutRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} checkinandout`;
  }

  update(id: number, updateCheckinandoutDto: UpdateCheckinandoutDto) {
    return `This action updates a #${id} checkinandout`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkinandout`;
  }
}
