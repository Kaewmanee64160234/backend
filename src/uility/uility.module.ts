import { Module } from '@nestjs/common';
import { UilityService } from './uility.service';
import { UilityController } from './uility.controller';
import { Uility } from './entities/uility.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Uility])],
  controllers: [UilityController],
  providers: [UilityService],
})
export class UilityModule {}
