import { Injectable } from '@nestjs/common';
import { CreateActivityperDto } from './dto/create-activityper.dto';
import { UpdateActivityperDto } from './dto/update-activityper.dto';

@Injectable()
export class ActivityperService {
  create(createActivityperDto: CreateActivityperDto) {
    return 'This action adds a new activityper';
  }

  findAll() {
    return `This action returns all activityper`;
  }

  findOne(id: number) {
    return `This action returns a #${id} activityper`;
  }

  update(id: number, updateActivityperDto: UpdateActivityperDto) {
    return `This action updates a #${id} activityper`;
  }

  remove(id: number) {
    return `This action removes a #${id} activityper`;
  }
}
