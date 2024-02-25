import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity } from './entities/activity.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private activitysRepository: Repository<Activity>,
  ) {}

  create(createActivityDto: CreateActivityDto) {
    const activity = this.activitysRepository.save(createActivityDto);
    if (!activity) {
      throw new NotFoundException();
    }
    return activity;
  }

  findAll() {
    return this.activitysRepository.find();
  }

  async findOne(id: number) {
    const activity = await this.activitysRepository.findOne({
      where: { act_id: id },
    });
    if (!activity) {
      throw new NotFoundException();
    }
    return activity;
  }

  async update(id: number, updateActivityDto: UpdateActivityDto) {
    const activity = await this.activitysRepository.findOneBy({ act_id: id });
    if (!activity) {
      throw new NotFoundException();
    }
    const updatedActivity = { ...activity, ...updateActivityDto };
    return this.activitysRepository.save(updatedActivity);
  }

  async remove(id: number) {
    const activity = await this.activitysRepository.findOneBy({ act_id: id });
    if (!activity) {
      throw new NotFoundException();
    }
    return this.activitysRepository.softRemove(activity);
  }
}
