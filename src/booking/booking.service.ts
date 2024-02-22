import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from 'src/customers/entities/customer.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Roomtype } from 'src/roomtypes/entities/roomtype.entity';
import { Promotion } from 'src/promotions/entities/promotion.entity';
import { Activity } from 'src/activity/entities/activity.entity';
import { Booking } from './entities/booking.entity';
import { BookingDetail } from './entities/bookingDetail';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>,
    @InjectRepository(BookingDetail)
    private bookingsdetailRepository: Repository<BookingDetail>,
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
    @InjectRepository(Roomtype)
    private roomTypesRepository: Repository<Roomtype>,
    @InjectRepository(Promotion)
    private promotionsRepository: Repository<Promotion>,
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
  ) {}

  async create(createBookingDto: CreateBookingDto) {
    // สร้าง receipt

    // ค้นหาลูกค้า (customer)
    const customer = await this.customersRepository.findOneBy({
      cus_id: createBookingDto.customerId,
    });
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    // ค้นหาพนักงาน (employee)
    const employee = await this.employeesRepository.findOneBy({
      emp_id: createBookingDto.employeeId,
    });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    // // ค้นหาพนักงาน (promotion)
    // const promotion = await this.promotionsRepository.findOneBy({
    //   prom_id: createReceiptDto.pr,
    // });
    // if (!employee) {
    //   throw new NotFoundException('Employee not found');
    // }

    const booking: Booking = new Booking();
    booking.customer = customer;
    booking.employee = employee;
    booking.booking_total = 0;

    const book = await this.bookingsRepository.save(booking);

    const bookingdetail: BookingDetail[] = await Promise.all(
      createBookingDto.bookingdetail.map(async (re) => {
        const bookingsdetail = new BookingDetail();
        bookingsdetail.booking_de_total_price = re.booking_de_total_price;

        // ค้นหาประเภทห้อง (roomtype)
        bookingsdetail.room.roomtype = await this.roomTypesRepository.findOneBy(
          {
            room_type_id: re.roomTypeId,
          },
        );
        if (!bookingsdetail.room.roomtype) {
          throw new NotFoundException('Room type not found');
        }

        // // ค้นหาห้อง (room)
        // receiptdetail.room = await this.roomsRepository.findOneBy({
        //   room_id: re.roomId,
        // });
        // if (!receiptdetail.room) {
        //   throw new NotFoundException('Room not found');
        // }

        bookingsdetail.booking_de_id = book.booking_id;
        return bookingsdetail;
      }),
    );

    for (const bookingsdetail_ of bookingdetail) {
      this.bookingsdetailRepository.save(bookingsdetail_);
      booking.booking_total += bookingsdetail_.booking_de_total_price;
    }
    booking.booking_total += booking.booking_cash_pledge;
    // activity
    //- promotion
    await this.bookingsRepository.save(booking);
    return booking;
  }

  findAll() {
    return `This action returns all booking`;
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
