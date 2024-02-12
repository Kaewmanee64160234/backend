import { Test, TestingModule } from '@nestjs/testing';
import { RoomserviceService } from './roomservice.service';

describe('RoomserviceService', () => {
  let service: RoomserviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomserviceService],
    }).compile();

    service = module.get<RoomserviceService>(RoomserviceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
