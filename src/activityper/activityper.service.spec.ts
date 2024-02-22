import { Test, TestingModule } from '@nestjs/testing';
import { ActivityperService } from './activityper.service';

describe('ActivityperService', () => {
  let service: ActivityperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivityperService],
    }).compile();

    service = module.get<ActivityperService>(ActivityperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
