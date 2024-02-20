import { Test, TestingModule } from '@nestjs/testing';
import { RoomserviceController } from './roomservice.controller';
import { RoomserviceService } from './roomservice.service';

describe('RoomserviceController', () => {
  let controller: RoomserviceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomserviceController],
      providers: [RoomserviceService],
    }).compile();

    controller = module.get<RoomserviceController>(RoomserviceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
