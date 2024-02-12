import { Test, TestingModule } from '@nestjs/testing';
import { UilityController } from './uility.controller';
import { UilityService } from './uility.service';

describe('UilityController', () => {
  let controller: UilityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UilityController],
      providers: [UilityService],
    }).compile();

    controller = module.get<UilityController>(UilityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
