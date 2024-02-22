import { Injectable, NotFoundException } from '@nestjs/common';
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
    const checkinandout = this.checkinandoutRepository.save(
      createCheckinandoutDto,
    );
    if (!checkinandout) {
      throw new NotFoundException();
    }
    return checkinandout;
  }

  findAll() {
    return this.checkinandoutRepository.find({
      relations: ['salary', 'employee'],
    });
  }

  async findOne(id: number) {
    const checkinandout = await this.checkinandoutRepository.findOne({
      where: { cio_id: id },
      relations: ['salary', 'employee'],
    });
    if (!checkinandout) {
      throw new NotFoundException();
    }
    return checkinandout;
  }

  async update(id: number, updateCheckinandoutDto: UpdateCheckinandoutDto) {
    const checkinandout = await this.checkinandoutRepository.findOneBy({
      cio_id: id,
    });
    if (!checkinandout) {
      throw new NotFoundException();
    }
    const updatedCheckinandout = {
      ...checkinandout,
      ...updateCheckinandoutDto,
    };
    return this.checkinandoutRepository.save(updatedCheckinandout);
  }

  async remove(id: number) {
    const checkinandout = await this.checkinandoutRepository.findOneBy({
      cio_id: id,
    });
    if (!checkinandout) {
      throw new NotFoundException();
    }
    return this.checkinandoutRepository.softRemove(checkinandout);
  }
}
