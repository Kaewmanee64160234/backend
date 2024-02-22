import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  create(createCustomerDto: CreateCustomerDto) {
    const customer = this.customersRepository.save(createCustomerDto);
    if (!customer) {
      throw new NotFoundException();
    }
    return customer;
  }

  findAll() {
    return this.customersRepository.find();
  }

  async findOne(id: number) {
    const customer = await this.customersRepository.findOne({
      where: { cus_id: id },
    });
    if (!customer) {
      throw new NotFoundException();
    }
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.customersRepository.findOneBy({ cus_id: id });
    if (!customer) {
      throw new NotFoundException();
    }
    const updatedCustomer = { ...customer, ...updateCustomerDto };
    return this.customersRepository.save(updatedCustomer);
  }

  async remove(id: number) {
    const customer = await this.customersRepository.findOneBy({ cus_id: id });
    if (!customer) {
      throw new NotFoundException();
    }
    return this.customersRepository.softRemove(customer);
  }
}
