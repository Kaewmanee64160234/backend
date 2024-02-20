import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
  ) {}

  create(createReviewDto: CreateReviewDto) {
    const review = this.reviewsRepository.save(createReviewDto);
    if (!review) {
      throw new NotFoundException();
    }
    return review;
  }

  findAll() {
    return this.reviewsRepository.find({
      relations: ['room', 'receiptdetail'],
    });
  }

  async findOne(id: number) {
    const review = await this.reviewsRepository.findOne({
      where: { rev_id: id },
    });
    if (!review) {
      throw new NotFoundException();
    }
    return review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const review = await this.reviewsRepository.findOneBy({ rev_id: id });
    if (!review) {
      throw new NotFoundException();
    }
    const updatedReview = { ...review, ...updateReviewDto };
    return this.reviewsRepository.save(updatedReview);
  }

  async remove(id: number) {
    const review = await this.reviewsRepository.findOneBy({ rev_id: id });
    if (!review) {
      throw new NotFoundException();
    }
    return this.reviewsRepository.softRemove(review);
  }
}
