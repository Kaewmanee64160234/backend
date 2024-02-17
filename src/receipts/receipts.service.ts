import { Injectable } from '@nestjs/common';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Receipt } from './entities/receipt.entity';
import { Repository } from 'typeorm';
import { ReceiptDetail } from './entities/receiptdetail.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Roomtype } from 'src/roomtypes/entities/roomtype.entity';

@Injectable()
export class ReceiptsService {

  constructor(
    @InjectRepository(Receipt)
    private receiptsRepository: Repository<Receipt>,
    @InjectRepository(ReceiptDetail)
    private receiptsdetailRepository: Repository<ReceiptDetail>,
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
    @InjectRepository(Roomtype)
    private roomTypesRepository: Repository<Roomtype>
  ) {}

  async create(createReceiptDto: CreateReceiptDto) {// สร้าง receipt
    const customer = await this.customersRepository.findOneBy({
      cus_id: createReceiptDto.customerId,
    });
    const employee = await this.employeesRepository.findOneBy({
      emp_id: createReceiptDto.employeeId,
    });
    // ใส่ if cnditionเพื่อดักว่าหาเจอไม่เจอ
    const receipt: Receipt = new Receipt();
    receipt.customer = customer;
    receipt.employee = employee;
    receipt.rec_total = 0;
    const rec =  await this.receiptsRepository.save(receipt);

    const receiptsdetail: ReceiptDetail[] = await Promise.all(
      createReceiptDto.receiptdetail.map(async (re) => {
        const receiptdetail = new ReceiptDetail();
        receiptdetail.recd_total_price = re.recd_total_price;
        receiptdetail.room.roomtype = await this.roomTypesRepository.findOneBy({room_type_id: re.roomTypeId})
        receiptdetail.room = await this.roomsRepository.findOneBy({room_id: re.roomId,});
        receiptdetail.recd_id = rec.rec_id;
      return receiptdetail;
  }),
  );
  
  for(const receiptdetail_ of receiptsdetail){
    this.receiptsdetailRepository.save(receiptdetail_);
    receipt.rec_total += receiptdetail_.recd_total_price;
  }
  receipt.rec_total += receipt.rec_cash_pledge;
  // activity
  //- promotion
  await this.receiptsRepository.save(receipt);
  return receipt
  }

  async findAll() {
    return await this.receiptsRepository.createQueryBuilder('receipt')
      .leftJoinAndSelect('receipt.customer', 'customer')
      .leftJoinAndSelect('receipt.employee', 'employee')
      .leftJoinAndSelect('receipt.promotion', 'promotion')
      .leftJoinAndSelect('receipt.receiptdetail', 'receiptdetail')
      .leftJoinAndSelect('receiptdetail.room', 'room')
      .leftJoinAndSelect('receiptdetail.brokenequipment', 'brokenequipment')
      .getMany();
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
