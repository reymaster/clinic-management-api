import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentService } from './appointment.service';
import { providersMock } from '../../test/mocks/providers.mock';

describe('AppointmentService', () => {
  let service: AppointmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [...providersMock],
    }).compile();

    service = module.get<AppointmentService>(AppointmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
