import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
  ) {}

  create(createEmployeeDto: CreateEmployeeDto) {
    const employee = this.employeesRepository.save(createEmployeeDto);
    if (!employee) {
      throw new NotFoundException();
    }
    return employee;
  }

  findAll() {
    return this.employeesRepository.find();
  }

  async findOne(id: number) {
    const employee = await this.employeesRepository.findOne({
      where: { emp_id: id },
    });
    if (!employee) {
      throw new NotFoundException();
    }
    return employee;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = await this.employeesRepository.findOneBy({ emp_id: id });
    if (!employee) {
      throw new NotFoundException();
    }
    const updatedEmployee = { ...employee, ...updateEmployeeDto };
    return this.employeesRepository.save(updatedEmployee);
  }

  async remove(id: number) {
    const employee = await this.employeesRepository.findOneBy({ emp_id: id });
    if (!employee) {
      throw new NotFoundException();
    }
    return this.employeesRepository.softRemove(employee);
  }
}
