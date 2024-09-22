import { Test, TestingModule } from '@nestjs/testing';
import { TreatmentGroupService } from './treatment-group.service';

describe('TreatmentGroupService', () => {
  let service: TreatmentGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TreatmentGroupService],
    }).compile();

    service = module.get<TreatmentGroupService>(TreatmentGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
