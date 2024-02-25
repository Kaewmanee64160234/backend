import { Get, Injectable, NotFoundException, Param } from '@nestjs/common';
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
import { Activityper } from 'src/activityper/entities/activityper.entity';

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
    try {
      const booking = new Booking();
      booking.booking_cus_name = createBookingDto.booking_cus_name;
      booking.booking_cus_lastname = createBookingDto.booking_cus_lastname;
      booking.booking_cus_tel = createBookingDto.booking_cus_tel;
      booking.booking_cus_email = createBookingDto.booking_cus_email;
      booking.booking_cus_addr = createBookingDto.booking_cus_addr;
      booking.booking_cus_addr_des = createBookingDto.booking_cus_addr_des;
      booking.booking_payment_booking =
        createBookingDto.booking_payment_booking;
      booking.booking_status = 'waiting';
      booking.booking_checkin = null;
      booking.booking_checkout = null;
      booking.booking_payment_checkout = null;
      booking.booking_status_late = null;
      booking.booking_adult = createBookingDto.booking_adult;
      booking.booking_child = createBookingDto.booking_child;


      booking.booking_total = 0;
      for (const book of createBookingDto.bookingdetail) {
        const room = await this.roomsRepository.findOne({
          relations: ['roomtype'],
          where: { room_id: book.roomId },
        });
        if (room) {
          booking.booking_total += room.roomtype.room_type_price;
        } else {
          throw new NotFoundException('Room not found');
        }
      }
      // Activity
      const activitypers = new Array<Activityper>();
      if (
        createBookingDto.activity_booking.length > 0 ||
        createBookingDto.activity_booking != null
      ) {
        // array ของ activityper
        for (const activity of createBookingDto.activity_booking) {
          const activity_ = await this.activityRepository.findOne({
            where: { act_id: activity.activityId },
          });
          if (!activity_) {
            throw new NotFoundException('Activity not found');
          }
          const activityper = new Activityper(); // สร้าง activityper
          activityper.activity = activity_;
          activityper.act_rec_qty = activity.act_rec_qty;
          activityper.act_rec_total_price =
            activity_.act_price * activity.act_rec_qty;

          booking.booking_total += activityper.act_rec_total_price;
          activitypers.push(activityper);
        }
      }
      // ค้นหาพนักงาน
      if (createBookingDto.employeeId) {
        const employee = await this.employeesRepository.findOne({
          where: { emp_id: createBookingDto.employeeId },
        });
        if (!employee) {
          throw new NotFoundException('Employee not found');
        }
        booking.employee = employee;
      }
      // ค้นหาลูกค้า
      if (createBookingDto.customerId) {
        const customer = await this.customersRepository.findOne({
          where: { cus_id: createBookingDto.customerId },
        });
        if (!customer) {
          throw new NotFoundException('Customer not found');
        }
        booking.customer = customer;
      }

      //promotion
      if (createBookingDto.promotionId) {
        const promotion = await this.promotionsRepository.findOne({
          where: { prom_id: createBookingDto.promotionId },
        });
        if (!promotion) {
          throw new NotFoundException('Promotion not found');
        }
        booking.promotion = promotion;
        booking.booking_total -= promotion.prom_discount;
      }
      booking.activityPer = activitypers;

      booking.booking_cash_pledge = createBookingDto.booking_cash_pledge;

      booking.booking_total_discount = createBookingDto.booking_total_discount;
      booking.booking_total -= createBookingDto.booking_total_discount; // ลดราคา
      // save
      const booking_ = await this.bookingsRepository.save(booking);
      return booking_;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Booking not found');
    }
  }
  findAll() {
    return this.bookingsRepository.find({
      relations: ['customer', 'employee', 'promotion'],
    });
  }

  //findOne booking
  async findOne(id: number) {
    const booking = await this.bookingsRepository.findOne({
      where: { booking_id: id },
      relations: ['customer', 'employee', 'promotion'],
    });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    return booking;
  }

  // update(id: number, updateBookingDto: UpdateBookingDto) {
  //   return `This action updates a #${id} booking`;
  // }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }

  //create update status booking
  async updateStatusBooking(id: number, updateBookingDto: UpdateBookingDto) {
    const booking = await this.bookingsRepository.findOne({
      where: { booking_id: id },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // Update booking status and updateDate
    booking.booking_status = updateBookingDto.booking_status;
    booking.updateDate = new Date(); // Set updateDate to current date/time

    await this.bookingsRepository.save(booking);

    return booking;
  }

  async getBookingByStatus(bookingstatus: string) {
    const booking = await this.bookingsRepository.find({
      where: { booking_status: bookingstatus },
      relations: ['customer', 'employee', 'promotion'],
    });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    return booking;
  }

  async getBookingByConfirm(updateBookingDto : UpdateBookingDto) {
    const booking = await this.bookingsRepository.find({
      where: { booking_id: updateBookingDto.booking_id },
      relations: ['customer', 'employee', 'promotion'],
      order: {
        updateDate: 'DESC',
      },
    });

    if (!booking || booking.length === 0) {
      console.error();
      throw new NotFoundException('Booking not found');
    }

    return booking;
  }

  async getBookingByConfirmTime(updateBookingDto : UpdateBookingDto) {
    const booking = await this.bookingsRepository.find({
      where: { booking_id: updateBookingDto.booking_id },
      relations: ['customer', 'employee', 'promotion'],
      order: {
        updateDate: 'DESC',
      },
    });

    if (!booking || booking.length === 0) {
      console.error();
      throw new NotFoundException('Booking not found');
    }

    return booking;
  }

  async getBookingByCustomer(bookingcus: number) {
    const booking = await this.bookingsRepository.find({
      where: { customer : {cus_id : bookingcus} },
      relations: ['customer', 'employee', 'promotion'],
    });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    return booking;
  }

  async getBookingByCustomerIdLastcreated(bookingcus: number) {
    const booking = await this.bookingsRepository.find({
      where: { customer : {cus_id : bookingcus} },
      relations: ['customer', 'employee', 'promotion'],
      order: {
        updateDate: 'DESC',
      },
    });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    return booking;
  }
}
