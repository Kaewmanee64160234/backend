import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
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

  @Post('employee')
  createByEmployee(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.createBookingByEmployee(createBookingDto);
  }

  @Get()
  findAll(@Query() query) {
    return this.bookingService.findAll(query);
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
  @Patch('/confrim/:id')
  updateStatusconfrimBooking(
    @Param('id') id: string,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    return this.bookingService.updateStatusBooking(+id, updateBookingDto);
  }

  @Get('/bookingstatus/:status')
  findByStatusBooking(@Param('status') bookingstatus: string) {
    return this.bookingService.getBookingByStatus(bookingstatus);
  }

  @Post('/find')
  getBookingByCustomerNameOrId(@Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.getBookingByCustomerNameOrId(updateBookingDto);
  }

  // @Get('/bookingstatus/:status/lasted')
  // findByStatusBookingDesc(@Param('status') bookingstatus: string) {
  //   return this.bookingService.getBookingByCustomerIdLastcreated(bookingstatus);
  // }

  @Get('/customer/:id')
  findByCustomer(@Param('id') bookingcus: number) {
    return this.bookingService.getBookingByCustommerId(bookingcus);
  }
  //GetgetBookingByEmployeeId
  @Get('/employee/:id')
  findByEmployee(@Param('id') bookingemp: number) {
    return this.bookingService.getBookingByEmployeeId(bookingemp);
  }

  @Get('/customer/:id/lasted')
  findByCustomerLastcreated(@Param('id') bookingcus: number) {
    return this.bookingService.getBookingByCustomerIdLastcreated(bookingcus);
  }

  @Get('/employee/:id/lasted')
  findByEmployeeLastcreated(@Param('id') bookingemp: number) {
    return this.bookingService.getBookingByEmployeeIdLastcreated(bookingemp);
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
