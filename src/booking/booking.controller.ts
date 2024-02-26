import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }

  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.updateStatusBooking(+id, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(+id);
  }

  // update status booking
  @Patch('/confrim')
  updateStatusconfrimBooking(@Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.getBookingByConfirm(updateBookingDto);
  }

  @Get('/status/:bookingstatus')
  findByStatusBooking(@Param('bookingstatus') bookingstatus: string) {
    return this.bookingService.getBookingByStatus(bookingstatus);
  }

  // @Get('/status/:bookingstatus/time')
  // findByStatusBookingDesc(@Param('bookingstatus') bookingstatus: string) {
  //   return this.bookingService.getBookingByConfirm(bookingstatus);
  // }

  @Get('/customer/:id')
  findByCustomer(@Param('id') bookingcus: number) {
    return this.bookingService.getBookingByCustommerId(bookingcus);
  }

  @Get('/customer/:id/lasted')
  findByCustomerLastcreated(@Param('id') bookingcus: number) {
    return this.bookingService.getBookingByCustomerIdLastcreated(bookingcus);
  }

  @Get('/time/:time/status/:status')
  getBookingByStatusAndOrderTime(
    @Param('time') bookingtime: string,
    @Param('status') bookingstatus: string,
  ) {
    return this.bookingService.getBookingByStatusAndOrderTime(
      bookingstatus,
      bookingtime,
    );
  }
}
