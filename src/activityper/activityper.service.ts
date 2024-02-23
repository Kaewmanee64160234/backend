import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateActivityperDto } from './dto/create-activityper.dto';
import { UpdateActivityperDto } from './dto/update-activityper.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Activityper } from './entities/activityper.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActivityperService {

  constructor(
    @InjectRepository(Activityper)
    private activityPersRepository: Repository<Activityper>,
  ) {}

  create(createActivityperDto: CreateActivityperDto) {
    const activityPer = this.activityPersRepository.save(createActivityperDto);
    if (!activityPer) {
      throw new NotFoundException();
    }
    return activityPer;
  }

  findAll() {
    return this.activityPersRepository.find();
  }

  async findOne(id: number) {
    const activityPer = await this.activityPersRepository.findOne({
      where: { act_rec_id: id },
    });
    if (!activityPer) {
      throw new NotFoundException();
    }
    return activityPer;
  }

  async update(id: number, updateActivityperDto: UpdateActivityperDto) {
    const activityPer = await this.activityPersRepository.findOneBy({ act_rec_id: id });
    if (!activityPer) {
      throw new NotFoundException();
    }
    const updatedActivityPer = { ...activityPer, ...updateActivityperDto };
    return this.activityPersRepository.save(updatedActivityPer);
  }

  async remove(id: number) {
    const activityPer = await this.activityPersRepository.findOneBy({ act_rec_id: id });
    if (!activityPer) {
      throw new NotFoundException();
    }
    return this.activityPersRepository.softRemove(activityPer);
  }
}
