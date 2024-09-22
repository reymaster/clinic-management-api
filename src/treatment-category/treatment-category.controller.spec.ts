import { Test, TestingModule } from '@nestjs/testing';
import { TreatmentCategoryController } from './treatment-category.controller';

describe('TreatmentCategoryController', () => {
  let controller: TreatmentCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TreatmentCategoryController],
    }).compile();

    controller = module.get<TreatmentCategoryController>(TreatmentCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
