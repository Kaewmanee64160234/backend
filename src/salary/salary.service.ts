import { Injectable } from '@nestjs/common';
import { CreateSalaryDto } from './dto/create-salary.dto';
import { UpdateSalaryDto } from './dto/update-salary.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Salary } from './entities/salary.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SalaryService {

  constructor(
    @InjectRepository(Salary)
    private salaryRepository: Repository<Salary>,
  ) {}

  create(createSalaryDto: CreateSalaryDto) {
    return 'This action adds a new salary';
  }

  findAll() {
    return this.salaryRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} salary`;
  }

  update(id: number, updateSalaryDto: UpdateSalaryDto) {
    return `This action updates a #${id} salary`;
  }

  remove(id: number) {
    return `This action removes a #${id} salary`;
  }
}
