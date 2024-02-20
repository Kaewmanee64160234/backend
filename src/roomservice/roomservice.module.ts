import { Module } from '@nestjs/common';
import { RoomserviceService } from './roomservice.service';
import { RoomserviceController } from './roomservice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roomservice } from './entities/roomservice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Roomservice])],
  controllers: [RoomserviceController],
  providers: [RoomserviceService]
})
export class RoomserviceModule {}
