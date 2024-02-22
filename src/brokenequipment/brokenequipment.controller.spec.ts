import { Test, TestingModule } from '@nestjs/testing';
import { BrokenequipmentController } from './brokenequipment.controller';
import { BrokenequipmentService } from './brokenequipment.service';

describe('BrokenequipmentController', () => {
  let controller: BrokenequipmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrokenequipmentController],
      providers: [BrokenequipmentService],
    }).compile();

    controller = module.get<BrokenequipmentController>(
      BrokenequipmentController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
