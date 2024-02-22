import { Module } from '@nestjs/common';
import { ActivityperService } from './activityper.service';
import { ActivityperController } from './activityper.controller';

@Module({
  controllers: [ActivityperController],
  providers: [ActivityperService]
})
export class ActivityperModule {}
