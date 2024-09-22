import { Test, TestingModule } from '@nestjs/testing';
import { TreatmentService } from './treatment.service';
import { providersMock } from '../../test/mocks/providers.mock';

describe('TreatmentService', () => {
  let service: TreatmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [...providersMock],
    }).compile();

    service = module.get<TreatmentService>(TreatmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
