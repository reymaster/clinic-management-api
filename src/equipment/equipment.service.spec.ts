import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentService } from './equipment.service';
import { providersMock } from '../../test/mocks/providers.mock';

describe('EquipmentService', () => {
  let service: EquipmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [...providersMock],
    }).compile();

    service = module.get<EquipmentService>(EquipmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
