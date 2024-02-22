import { Module } from '@nestjs/common';
import { BrokenequipmentService } from './brokenequipment.service';
import { BrokenequipmentController } from './brokenequipment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brokenequipment } from './entities/brokenequipment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Brokenequipment])],
  controllers: [BrokenequipmentController],
  providers: [BrokenequipmentService],
})
export class BrokenequipmentModule {}
