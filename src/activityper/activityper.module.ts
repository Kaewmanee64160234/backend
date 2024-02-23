import { Module } from '@nestjs/common';
import { ActivityperService } from './activityper.service';
import { ActivityperController } from './activityper.controller';
import { Activityper } from './entities/activityper.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Activityper])],
  controllers: [ActivityperController],
  providers: [ActivityperService],
})
export class ActivityperModule {}
