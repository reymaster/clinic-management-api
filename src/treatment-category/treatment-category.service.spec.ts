import { Test, TestingModule } from '@nestjs/testing';
import { TreatmentCategoryService } from './treatment-category.service';

describe('TreatmentCategoryService', () => {
  let service: TreatmentCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TreatmentCategoryService],
    }).compile();

    service = module.get<TreatmentCategoryService>(TreatmentCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
