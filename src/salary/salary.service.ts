import { Injectable, NotFoundException } from '@nestjs/common';
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
    const salary = this.salaryRepository.save(createSalaryDto);
    if(!salary){
      throw new NotFoundException();
    }
    return salary
  }

  findAll() {
    return this.salaryRepository.find();
  }

  async findOne(id: number) {
    const salary = await this.salaryRepository.findOne({ where: { ss_id: id } });
    if (!salary){
      throw new NotFoundException();
    }
    return salary
  }

  async update(id: number, updateSalaryDto: UpdateSalaryDto) {
    const salary = await this.salaryRepository.findOneBy({ss_id :id})
    if(!salary){
      throw new NotFoundException();
    }
    const updatedSalary = {...salary,...updateSalaryDto};
    return this.salaryRepository.save(updatedSalary);
  }

  async remove(id: number) {
    const room = await this.salaryRepository.findOneBy({ss_id :id})
    if(!room){
      throw new NotFoundException();
    }
    return this.salaryRepository.softRemove(room);
  }
}
