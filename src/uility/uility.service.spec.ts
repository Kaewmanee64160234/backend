import { Test, TestingModule } from '@nestjs/testing';
import { UilityService } from './uility.service';

describe('UilityService', () => {
  let service: UilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UilityService],
    }).compile();

    service = module.get<UilityService>(UilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
