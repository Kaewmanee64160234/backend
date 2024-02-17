import { Module } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { ReceiptsController } from './receipts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipt } from './entities/receipt.entity';
import { ReceiptDetail } from './entities/receiptdetail.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Roomtype } from 'src/roomtypes/entities/roomtype.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Receipt, ReceiptDetail, Customer, Employee, Room,Roomtype])],
  controllers: [ReceiptsController],
  providers: [ReceiptsService]
})
export class ReceiptsModule {}
