import { Test, TestingModule } from '@nestjs/testing';
import { BrokenequipmentService } from './brokenequipment.service';

describe('BrokenequipmentService', () => {
  let service: BrokenequipmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrokenequipmentService],
    }).compile();

    service = module.get<BrokenequipmentService>(BrokenequipmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
