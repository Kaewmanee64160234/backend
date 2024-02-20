import { Test, TestingModule } from '@nestjs/testing';
import { CheckinandoutService } from './checkinandout.service';

describe('CheckinandoutService', () => {
  let service: CheckinandoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckinandoutService],
    }).compile();

    service = module.get<CheckinandoutService>(CheckinandoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
