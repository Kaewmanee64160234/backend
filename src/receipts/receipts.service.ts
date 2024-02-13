import { Injectable } from '@nestjs/common';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Receipt } from './entities/receipt.entity';
import { Repository } from 'typeorm';
import { ReceiptDetail } from './entities/receiptdetail.entity';

@Injectable()
export class ReceiptsService {

  constructor(
    @InjectRepository(Receipt)
    private receiptsRepository: Repository<Receipt>,
    // @InjectRepository(ReceiptDetail)
    // private receiptsdetailRepository: Repository<ReceiptDetail>,
  ) {}

  create(createReceiptDto: CreateReceiptDto) {
    return 'This action adds a new receipt';
  }

  findAll() {
    return this.receiptsRepository.find({ relations: ['customer', 'employee' , 'promotion' , 'receiptdetail'] });
  }

  // findAlldetail() {
  //   return this.receiptsdetailRepository.find({ relations: ['activity' ] });
  // }

  findOne(id: number) {
    return `This action returns a #${id} receipt`;
  }

  update(id: number, updateReceiptDto: UpdateReceiptDto) {
    return `This action updates a #${id} receipt`;
  }

  remove(id: number) {
    return `This action removes a #${id} receipt`;
  }
}
