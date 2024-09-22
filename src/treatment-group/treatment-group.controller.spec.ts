import { Test, TestingModule } from '@nestjs/testing';
import { TreatmentGroupController } from './treatment-group.controller';

describe('TreatmentGroupController', () => {
  let controller: TreatmentGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TreatmentGroupController],
    }).compile();

    controller = module.get<TreatmentGroupController>(TreatmentGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
