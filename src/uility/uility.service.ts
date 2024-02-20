import { Injectable, NotFoundException } from '@nestjs/common';
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
    const uility = this.uilityRepository.save(createUilityDto);
    if (!uility) {
      throw new NotFoundException();
    }
    return uility;
  }

  findAll() {
    return this.uilityRepository.find({ relations: ['employee'] });
  }

  async findOne(id: number) {
    const uility = await this.uilityRepository.findOne({
      where: { ue_id: id },
      relations: ['employee'],
    });
    if (!uility) {
      throw new NotFoundException();
    }
    return uility;
  }

  async update(id: number, updateUilityDto: UpdateUilityDto) {
    const uility = await this.uilityRepository.findOneBy({ ue_id: id });
    if (!uility) {
      throw new NotFoundException();
    }
    const updatedUility = { ...uility, ...updateUilityDto };
    return this.uilityRepository.save(updatedUility);
  }

  async remove(id: number) {
    const uility = await this.uilityRepository.findOneBy({ ue_id: id });
    if (!uility) {
      throw new NotFoundException();
    }
    return this.uilityRepository.softRemove(uility);
  }
}
