import { Test, TestingModule } from '@nestjs/testing';
import { PlanAnualController } from './plan-anual.controller';
import { PlanAnualService } from './plan-anual.service';

describe('PlanAnualController', () => {
  let controller: PlanAnualController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanAnualController],
      providers: [PlanAnualService],
    }).compile();

    controller = module.get<PlanAnualController>(PlanAnualController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
