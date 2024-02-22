import { Test, TestingModule } from '@nestjs/testing';
import { ActivityperController } from './activityper.controller';
import { ActivityperService } from './activityper.service';

describe('ActivityperController', () => {
  let controller: ActivityperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityperController],
      providers: [ActivityperService],
    }).compile();

    controller = module.get<ActivityperController>(ActivityperController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
