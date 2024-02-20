import { Test, TestingModule } from '@nestjs/testing';
import { CheckinandoutController } from './checkinandout.controller';
import { CheckinandoutService } from './checkinandout.service';

describe('CheckinandoutController', () => {
  let controller: CheckinandoutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckinandoutController],
      providers: [CheckinandoutService],
    }).compile();

    controller = module.get<CheckinandoutController>(CheckinandoutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
