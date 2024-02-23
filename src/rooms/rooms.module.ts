import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Roomtype } from 'src/roomtypes/entities/roomtype.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Roomtype])],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
