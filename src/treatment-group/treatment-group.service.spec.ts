import { Test, TestingModule } from '@nestjs/testing';
import { TreatmentGroupService } from './treatment-group.service';
import { providersMock } from '../../test/mocks/providers.mock';

describe('TreatmentGroupService', () => {
  let service: TreatmentGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [...providersMock],
    }).compile();

    service = module.get<TreatmentGroupService>(TreatmentGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
