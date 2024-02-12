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

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'mysql',
//       host: 'www.db4free',
//       port: 3600,
//       username: 'hotelcarifornai',
//       password: 'pass@1234',
//       database: 'hotelcarifornai',
//       entities: [Customer],
//       synchronize: true,
//     }),
//     CustomersModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Customer, Employee, User],
      synchronize: true,
    }),
    CustomersModule,
    EmployeesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
