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
    @InjectRepository(Activityper)
    private activityPerRepository: Repository<Activityper>,
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
      booking.booking_payment_checkout = null;
      booking.booking_status_late = null;
      booking.booking_adult = createBookingDto.booking_adult;
      booking.booking_child = createBookingDto.booking_child;

      const checkinDate = new Date(createBookingDto.booking_checkin);
      const checkoutDate = new Date(createBookingDto.booking_checkout);
      const diffTime = checkoutDate.getTime() - checkinDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));

      // Initialize booking total
      booking.booking_total = 0;

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
          const activityper_created = await this.activityPerRepository.save(
            activityper,
          );

          activitypers.push(activityper_created);
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

      for (const book of createBookingDto.bookingdetail) {
        console.log(book);
        const room = await this.roomsRepository.findOne({
          relations: ['roomtype'],
          where: { room_id: book.roomId },
        });
        console.log(room);
        if (room) {
          booking_.booking_total += room.roomtype.room_type_price * diffDays;
          const bookingDetail = new BookingDetail();
          bookingDetail.room = room;
          bookingDetail.booking = booking_;
          await this.bookingsdetailRepository.save(bookingDetail);
        } else {
          throw new NotFoundException('Room not found');
        }
      }
      const booking__ = await this.bookingsRepository.save(booking_);

      return this.bookingsRepository.findOne({
        where: { booking_id: booking__.booking_id },
        relations: [
          'customer',
          'employee',
          'promotion',
          'bookingDetail',
          'activityPer',
          'activityPer.activity',
          'bookingDetail.room',
          'bookingDetail.room.roomtype',
        ],
      });
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Booking not found');
    }
  }
  findAll() {
    return this.bookingsRepository.find({
      relations: [
        'customer',
        'employee',
        'promotion',
        'bookingDetail',
        'activityPer',
        'activityPer.activity',
        'bookingDetail.room',
        'bookingDetail.room.roomtype',
      ],
    });
  }

  //findOne booking
  async findOne(id: number) {
    const booking = await this.bookingsRepository.findOne({
      where: { booking_id: id },
      relations: [
        'customer',
        'employee',
        'promotion',
        'bookingDetail',
        'activityPer',
        'activityPer.activity',
        'bookingDetail.room',
        'bookingDetail.room.roomtype',
      ],
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
    try {
      this.bookingsRepository.delete(id);
      return { message: 'Delete success' };
    } catch (error) {
      console.log(error);
    }
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
    booking.updateDate = new Date();

    await this.bookingsRepository.save(booking);
    if (booking.booking_status == 'confirm') {
      //set room to status booking
      const bookingdetail = await this.bookingsdetailRepository.find({
        where: { booking: { booking_id: id } },
        relations: ['room'],
      });
      for (const book of bookingdetail) {
        book.room.room_status = 'booking';
        await this.roomsRepository.save(book.room);
      }
    }
    if (booking.booking_status == 'cancel') {
      //set room to status booking
      const bookingdetail = await this.bookingsdetailRepository.find({
        where: { booking: { booking_id: id } },
        relations: ['room'],
      });
      for (const book of bookingdetail) {
        book.room.room_status = 'ready';
        await this.roomsRepository.save(book.room);
      }
    }
    if (booking.booking_status == 'checkin') {
      const bookingdetail = await this.bookingsdetailRepository.find({
        where: { booking: { booking_id: id } },
        relations: ['room'],
      });
      for (const book of bookingdetail) {
        book.room.room_status = 'checkin';
        await this.roomsRepository.save(book.room);
      }
    }
    if (booking.booking_status == 'checkout') {
      const bookingdetail = await this.bookingsdetailRepository.find({
        where: { booking: { booking_id: id } },
        relations: ['room'],
      });
      for (const book of bookingdetail) {
        book.room.room_status = 'empty';
        await this.roomsRepository.save(book.room);
      }
    }
    return this.bookingsRepository.findOne({
      where: { booking_id: id },
      relations: [
        'customer',
        'employee',
        'promotion',
        'bookingDetail',
        'activityPer',
        'activityPer.activity',
        'bookingDetail.room',
        'bookingDetail.room.roomtype',
      ],
    });
  }

  async getBookingByStatus(bookingstatus: string) {
    const booking = await this.bookingsRepository.find({
      where: { booking_status: bookingstatus },
      relations: [
        'customer',
        'employee',
        'promotion',
        'bookingDetail',
        'activityPer',
        'activityPer.activity',
        'bookingDetail.room',
        'bookingDetail.room.roomtype',
      ],
    });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    return booking;
  }

  async getBookingByConfirm(updateBookingDto: UpdateBookingDto) {
    const booking = await this.bookingsRepository.find({
      where: { booking_id: updateBookingDto.booking_id },
      relations: [
        'customer',
        'employee',
        'promotion',
        'bookingDetail',
        'activityPer',
        'activityPer.activity',
        'bookingDetail.room',
        'bookingDetail.room.roomtype',
      ],

      order: {
        updateDate: 'DESC',
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    return booking;
  }

  async getBookingByConfirmTime(updateBookingDto: UpdateBookingDto) {
    const booking = await this.bookingsRepository.find({
      where: { booking_id: updateBookingDto.booking_id },
      relations: [
        'customer',
        'employee',
        'promotion',
        'bookingDetail',
        'activityPer',
        'activityPer.activity',
        'bookingDetail.room',
        'bookingDetail.room.roomtype',
      ],
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

  async getBookingByCustommerId(bookingcus: number) {
    const booking = await this.bookingsRepository.find({
      where: { customer: { cus_id: bookingcus } },
      relations: [
        'customer',
        'employee',
        'promotion',
        'bookingDetail',
        'activityPer',
        'activityPer.activity',
        'bookingDetail.room',
        'bookingDetail.room.roomtype',
      ],
      order: {
        booking_create_date: 'DESC',
      },
    });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    return booking;
  }
  //getBookingByEmployeeId
  async getBookingByEmployeeId(bookingemp: number) {
    const booking = await this.bookingsRepository.find({
      where: { employee: { emp_id: bookingemp } },
      relations: [
        'customer',
        'employee',
        'promotion',
        'bookingDetail',
        'activityPer',
        'activityPer.activity',
        'bookingDetail.room',
        'bookingDetail.room.roomtype',
      ],
      order: {
        booking_create_date: 'DESC',
      },
    });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    return booking;
  }

  async getBookingByCustomerIdLastcreated(bookingcus: number) {
    const booking = await this.bookingsRepository.findOne({
      where: { customer: { cus_id: bookingcus } },
      relations: [
        'customer',
        'employee',
        'promotion',
        'bookingDetail',
        'activityPer',
        'activityPer.activity',
        'bookingDetail.room',
        'bookingDetail.room.roomtype',
      ],
      order: {
        booking_create_date: 'DESC',
      },
    });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    return booking;
  }

  //getBookingByUserIdLastcreated
  // async getBookingByUserIdLastcreated(bookingemp: number) {
  //   const booking = await this.bookingsRepository.findOne({
  //     where: { employee: { emp_id: bookingemp } },
  //     relations: [
  //       'customer',
  //       'employee',
  //       'promotion',
  //       'bookingDetail',
  //       'activityPer',
  //       'activityPer.activity',
  //       'bookingDetail.room',
  //       'bookingDetail.room.roomtype',
  //     ],
  //     order: {
  //       booking_create_date: 'DESC',
  //     },
  //   });
  //   if (!booking) {
  //     throw new NotFoundException('Booking not found');
  //   }
  //   return booking;
  // }

  //create function create booking by employee
  async createBookingByEmployee(createBookingDto: CreateBookingDto) {
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
      booking.booking_checkin = new Date(createBookingDto.booking_checkin);
      booking.booking_checkout = new Date(createBookingDto.booking_checkout);
      booking.booking_payment_checkout = null;
      booking.booking_status_late = null;
      booking.booking_adult = createBookingDto.booking_adult;
      booking.booking_child = createBookingDto.booking_child;

      booking.booking_total = 0;
      console.log(booking.booking_checkin);
      console.log(booking.booking_checkout);

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
          const activityper_created = await this.activityPerRepository.save(
            activityper,
          );

          activitypers.push(activityper_created);
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

      for (const book of createBookingDto.bookingdetail) {
        console.log(book);
        const room = await this.roomsRepository.findOne({
          relations: ['roomtype'],
          where: { room_id: book.roomId },
        });
        console.log(room);
        if (room) {
          booking_.booking_total += room.roomtype.room_type_price;
          const bookingDetail = new BookingDetail();
          bookingDetail.room = room;
          bookingDetail.booking = booking_;
          await this.bookingsdetailRepository.save(bookingDetail);
        } else {
          throw new NotFoundException('Room not found');
        }
      }
      const booking__ = await this.bookingsRepository.save(booking_);

      return this.bookingsRepository.findOne({
        where: { booking_id: booking__.booking_id },
        relations: [
          'customer',
          'employee',
          'promotion',
          'bookingDetail',
          'activityPer',
          'activityPer.activity',
          'bookingDetail.room',
          'bookingDetail.room.roomtype',
        ],
      });
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Booking not found');
    }
  }

  //create fucntion getBookingbyStatusAndOrderTime
  async getBookingByStatusAndOrderTime(bookingstatus: string, order: string) {
    if (order.toLowerCase() === 'desc') {
      if (bookingstatus.toLowerCase() === 'all') {
        const booking = await this.bookingsRepository.find({
          relations: [
            'customer',
            'employee',
            'promotion',
            'bookingDetail',
            'activityPer',
            'activityPer.activity',
            'bookingDetail.room',
            'bookingDetail.room.roomtype',
          ],
          order: {
            booking_create_date: 'DESC',
          },
        });
        if (!booking) {
          throw new NotFoundException('Booking not found');
        }
        return booking;
      }
      const booking = await this.bookingsRepository.find({
        where: { booking_status: bookingstatus },
        relations: [
          'customer',
          'employee',
          'promotion',
          'bookingDetail',
          'activityPer',
          'activityPer.activity',
          'bookingDetail.room',
          'bookingDetail.room.roomtype',
        ],
        order: {
          booking_create_date: 'DESC',
        },
      });
      if (!booking) {
        throw new NotFoundException('Booking not found');
      }
      return booking;
    } else if (order.toLowerCase() === 'all') {
      const booking = await this.bookingsRepository.find({
        where: { booking_status: bookingstatus },
        relations: [
          'customer',
          'employee',
          'promotion',
          'bookingDetail',
          'activityPer',
          'activityPer.activity',
          'bookingDetail.room',
          'bookingDetail.room.roomtype',
        ],
      });
      if (!booking) {
        throw new NotFoundException('Booking not found');
      }
      return booking;
    } else if (order.toLowerCase() === 'asc') {
      if (bookingstatus.toLowerCase() === 'waiting') {
        const booking = await this.bookingsRepository.find({
          where: { booking_status: bookingstatus },
          relations: [
            'customer',
            'employee',
            'promotion',
            'bookingDetail',
            'activityPer',
            'activityPer.activity',
            'bookingDetail.room',
            'bookingDetail.room.roomtype',
          ],
          order: {
            booking_create_date: 'ASC',
          },
        });
        if (!booking) {
          throw new NotFoundException('Booking not found');
        }
        return booking;
      }
    } else {
      const booking = await this.bookingsRepository.find({
        relations: [
          'customer',
          'employee',
          'promotion',
          'bookingDetail',
          'activityPer',
          'activityPer.activity',
          'bookingDetail.room',
          'bookingDetail.room.roomtype',
        ],
        order: {
          booking_create_date: 'ASC',
        },
      });
      if (!booking) {
        throw new NotFoundException('Booking not found');
      }
      return booking;
    }
  }

  //create function search booking by namecustomer or id
  async getBookingByCustomerNameOrId(updateBookingDto: UpdateBookingDto) {
    console.log(updateBookingDto);
    // Validate input to ensure it's not undefined, null, or any unexpected value
    if (
      !updateBookingDto.booking_cus_name ||
      updateBookingDto.booking_cus_name.trim() === ''
    ) {
      throw new Error('Invalid customer name provided.');
    }

    // Proceed with the query if the input is valid
    try {
      const booking = await this.bookingsRepository.find({
        where: [
          { booking_cus_name: updateBookingDto.booking_cus_name },
          { booking_cus_lastname: updateBookingDto.booking_cus_name },
          { customer: { cus_name: updateBookingDto.booking_cus_name } },
        ],
        relations: [
          'customer',
          'employee',
          'promotion',
          'bookingDetail',
          'activityPer',
          'activityPer.activity',
          'bookingDetail.room',
          'bookingDetail.room.roomtype',
        ],
      });

      if (!booking || booking.length === 0) {
        throw new NotFoundException('Booking not found');
      }

      return booking;
    } catch (error) {
      // Handle or log the error as needed
      console.error('Error fetching booking by customer name or ID:', error);
      throw error; // Or handle more gracefully as needed
    }
  }
  //update booking  checkin
  async updateBookingCheckin(id: number) {
    const booking = await this.bookingsRepository.findOne({
      where: { booking_id: id },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    booking.booking_status = 'checkin';
    booking.booking_checkin = new Date();
    booking.updateDate = new Date();

    await this.bookingsRepository.save(booking);

    return this.bookingsRepository.findOne({
      where: { booking_id: id },
      relations: [
        'customer',
        'employee',
        'promotion',
        'bookingDetail',
        'activityPer',
        'activityPer.activity',
        'bookingDetail.room',
        'bookingDetail.room.roomtype',
      ],
    });
  }

  //create function getBookingByEmployeeIdLastcreated
  async getBookingByEmployeeIdLastcreated(bookingemp: number) {
    const booking = await this.bookingsRepository.findOne({
      where: { employee: { emp_id: bookingemp } },
      relations: [
        'customer',
        'employee',
        'promotion',
        'bookingDetail',
        'activityPer',
        'activityPer.activity',
        'bookingDetail.room',
        'bookingDetail.room.roomtype',
      ],
      order: {
        booking_create_date: 'DESC',
      },
    });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    return booking;
  }

  // check in bookings
  async checkInBooking(id: number) {
    const booking = await this.bookingsRepository.findOne({
      where: { booking_id: id },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    booking.booking_status = 'checkin';
    booking.booking_checkin = new Date();
    booking.updateDate = new Date();
    //set status room
    const bookingdetail = await this.bookingsdetailRepository.find({
      where: { booking: { booking_id: id } },
      relations: ['room'],
    });
    for (const book of bookingdetail) {
      book.room.room_status = 'checkin';
      await this.roomsRepository.save(book.room);
    }

    await this.bookingsRepository.save(booking);

    return this.bookingsRepository.findOne({
      where: { booking_id: id },
      relations: [
        'customer',
        'employee',
        'promotion',
        'bookingDetail',
        'activityPer',
        'activityPer.activity',
        'bookingDetail.room',
        'bookingDetail.room.roomtype',
      ],
    });
  }

  // check out bookings
  async checkOutBooking(id: number, updatedBookingDto: UpdateBookingDto) {
    const booking = await this.bookingsRepository.findOne({
      where: { booking_id: id },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    booking.booking_status = 'checkout';
    booking.booking_payment_checkout = 'cash';
    booking.updateDate = new Date();
    //set status room
    const bookingdetail = await this.bookingsdetailRepository.find({
      where: { booking: { booking_id: id } },
      relations: ['room'],
    });
    for (const book of bookingdetail) {
      book.room.room_status = 'ready';
      await this.roomsRepository.save(book.room);
    }
    //if checkout late + fine
    const date1 = new Date(booking.booking_checkout);
    const date2 = new Date();
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 0) {
      booking.booking_status_late = 'late';
      booking.booking_total += diffDays * 100;
    }
    // set status payment checkout
    booking.booking_payment_checkout =
      updatedBookingDto.booking_payment_checkout;

    await this.bookingsRepository.save(booking);

    return this.bookingsRepository.findOne({
      where: { booking_id: id },
      relations: [
        'customer',
        'employee',
        'promotion',
        'bookingDetail',
        'activityPer',
        'activityPer.activity',
        'bookingDetail.room',
        'bookingDetail.room.roomtype',
      ],
    });
  }
}
