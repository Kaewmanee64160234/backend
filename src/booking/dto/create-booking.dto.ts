import { CreateActivityperDto } from 'src/activityper/dto/create-activityper.dto';
import { Activityper } from 'src/activityper/entities/activityper.entity';

class CreateBookingDetailDto {
  booking_de_adult: string;
  booking_de_child: string;
  // booking_de_total_price: number;
  roomId: string;
}

export class CreateBookingDto {
  booking_id?: number;

  booking_create_date: Date;

  booking_cus_name: string;

  booking_cus_lastname: string;

  booking_cus_tel: string;

  booking_cus_email: string;

  booking_cus_addr: string;

  booking_cus_addr_des: string;

  booking_checkin?: Date;

  booking_checkout?: Date;

  booking_total: number;

  booking_cash_pledge: number;

  booking_total_discount?: number;

  booking_payment_booking: string;

  booking_payment_checkout?: string;

  booking_status: string;

  booking_status_late?: string;

  customerId?: number;

  employeeId?: number;

  promotionId?: number;

  bookingdetail: CreateBookingDetailDto[];

  activity_booking?: CreateActivityperDto[];
}
