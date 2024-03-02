import { Booking } from 'src/booking/entities/booking.entity';

interface Paginate {
  data: any;
  count: number;
  currentPage: number;
  lastPage: number;
}
