import { Test, TestingModule } from '@nestjs/testing';
import { RoomtypesController } from './roomtypes.controller';
import { RoomtypesService } from './roomtypes.service';

describe('RoomtypesController', () => {
  let controller: RoomtypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomtypesController],
      providers: [RoomtypesService],
    }).compile();

    controller = module.get<RoomtypesController>(RoomtypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
