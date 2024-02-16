import { Module } from '@nestjs/common';
import { RoomtypesService } from './roomtypes.service';
import { RoomtypesController } from './roomtypes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roomtype } from './entities/roomtype.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Roomtype])],
  controllers: [RoomtypesController],
  providers: [RoomtypesService]
})
export class RoomtypesModule {}
