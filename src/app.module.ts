import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from './customers/customers.module';
import { Customer } from './customers/entities/customer.entity';
import { EmployeesModule } from './employees/employees.module';
import { Employee } from './employees/entities/employee.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { RoomsModule } from './rooms/rooms.module';
import { Room } from './rooms/entities/room.entity';
import { ActivityModule } from './activity/activity.module';
import { Activity } from './activity/entities/activity.entity';
import { RoomserviceModule } from './roomservice/roomservice.module';
import { Roomservice } from './roomservice/entities/roomservice.entity';
import { PromotionsModule } from './promotions/promotions.module';
import { Promotion } from './promotions/entities/promotion.entity';
import { UilityModule } from './uility/uility.module';
import { Uility } from './uility/entities/uility.entity';
import { Brokenequipment } from './brokenequipment/entities/brokenequipment.entity';
import { BrokenequipmentModule } from './brokenequipment/brokenequipment.module';
import { SalaryModule } from './salary/salary.module';
import { Salary } from './salary/entities/salary.entity';
import { CheckinandoutModule } from './checkinandout/checkinandout.module';
import { Checkinandout } from './checkinandout/entities/checkinandout.entity';
import { ReviewsModule } from './reviews/reviews.module';
import { Review } from './reviews/entities/review.entity';
import { RoomtypesModule } from './roomtypes/roomtypes.module';
import { Roomtype } from './roomtypes/entities/roomtype.entity';
import { ActivityperModule } from './activityper/activityper.module';
import { Activityper } from './activityper/entities/activityper.entity';
import { BookingModule } from './booking/booking.module';
import { Booking } from './booking/entities/booking.entity';
import { BookingDetail } from './booking/entities/bookingDetail';
import { AuthsModule } from './auths/auths.module';
import { Auth } from './auths/entities/auth.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'hotelcarifornai',
      entities: [
        Booking,
        Employee,
        Customer,
        User,
        Room,
        Activity,
        Roomservice,
        Promotion,
        Brokenequipment,
        Salary,
        Checkinandout,
        Review,
        Roomtype,
        Activityper,
        Uility,
        BookingDetail,
        Auth,
      ],
      synchronize: true,
    }),
    CustomersModule,
    EmployeesModule,
    UsersModule,
    RoomsModule,
    ActivityModule,
    RoomserviceModule,
    PromotionsModule,
    BrokenequipmentModule,
    CheckinandoutModule,
    ReviewsModule,
    RoomtypesModule,
    ActivityperModule,
    UilityModule,
    AuthsModule,
    BookingModule,
    SalaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
