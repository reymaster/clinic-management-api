import { Test, TestingModule } from '@nestjs/testing';
import { TreatmentCategoryService } from './treatment-category.service';
import { providersMock } from '../../test/mocks/providers.mock';

describe('TreatmentCategoryService', () => {
  let service: TreatmentCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [...providersMock],
    }).compile();

    service = module.get<TreatmentCategoryService>(TreatmentCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
