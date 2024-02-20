import { Test, TestingModule } from '@nestjs/testing';
import { RoomtypesService } from './roomtypes.service';

describe('RoomtypesService', () => {
  let service: RoomtypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomtypesService],
    }).compile();

    service = module.get<RoomtypesService>(RoomtypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
