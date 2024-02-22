import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Promotion } from './entities/promotion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PromotionsService {
  constructor(
    @InjectRepository(Promotion)
    private promotionsRepository: Repository<Promotion>,
  ) {}

  create(createPromotionDto: CreatePromotionDto) {
    const promotion = this.promotionsRepository.save(createPromotionDto);
    if (!promotion) {
      throw new NotFoundException();
    }
    return promotion;
  }

  findAll() {
    return this.promotionsRepository.find();
  }

  async findOne(id: number) {
    const promotion = await this.promotionsRepository.findOne({
      where: { prom_id: id },
    });
    if (!promotion) {
      throw new NotFoundException();
    }
    return promotion;
  }

  async update(id: number, updatePromotionDto: UpdatePromotionDto) {
    const promotion = await this.promotionsRepository.findOneBy({
      prom_id: id,
    });
    if (!promotion) {
      throw new NotFoundException();
    }
    const updatePromotion = { ...promotion, ...updatePromotionDto };
    return this.promotionsRepository.save(updatePromotion);
  }

  async remove(id: number) {
    const promotion = await this.promotionsRepository.findOneBy({
      prom_id: id,
    });
    if (!promotion) {
      throw new NotFoundException();
    }
    return this.promotionsRepository.softRemove(promotion);
  }
}
