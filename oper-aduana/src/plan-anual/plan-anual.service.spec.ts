import { Test, TestingModule } from '@nestjs/testing';
import { PlanAnualService } from './plan-anual.service';

describe('PlanAnualService', () => {
  let service: PlanAnualService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanAnualService],
    }).compile();

    service = module.get<PlanAnualService>(PlanAnualService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
