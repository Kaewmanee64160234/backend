import { Injectable, NotFoundException } from '@nestjs/common';
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
    const brokenEquipment = this.brokenequipmentsRepository.save(
      createBrokenequipmentDto,
    );
    if (!brokenEquipment) {
      throw new NotFoundException();
    }
    return brokenEquipment;
  }

  findAll() {
    return this.brokenequipmentsRepository.find();
  }

  async findOne(id: number) {
    const brokenEquipment = await this.brokenequipmentsRepository.findOne({
      where: { bro_ep_id: id },
    });
    if (!brokenEquipment) {
      throw new NotFoundException();
    }
    return brokenEquipment;
  }

  async update(id: number, updateBrokenequipmentDto: UpdateBrokenequipmentDto) {
    const brokenEquipment = await this.brokenequipmentsRepository.findOneBy({
      bro_ep_id: id,
    });
    if (!brokenEquipment) {
      throw new NotFoundException();
    }
    const updatedbrokenEquipment = {
      ...brokenEquipment,
      ...updateBrokenequipmentDto,
    };
    return this.brokenequipmentsRepository.save(updatedbrokenEquipment);
  }

  async remove(id: number) {
    const brokenEquipment = await this.brokenequipmentsRepository.findOneBy({
      bro_ep_id: id,
    });
    if (!brokenEquipment) {
      throw new NotFoundException();
    }
    return this.brokenequipmentsRepository.softRemove(brokenEquipment);
  }
}
