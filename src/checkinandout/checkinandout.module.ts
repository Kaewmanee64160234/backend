import { Module } from '@nestjs/common';
import { CheckinandoutService } from './checkinandout.service';
import { CheckinandoutController } from './checkinandout.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Checkinandout } from './entities/checkinandout.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Checkinandout])],
  controllers: [CheckinandoutController],
  providers: [CheckinandoutService],
})
export class CheckinandoutModule {}
