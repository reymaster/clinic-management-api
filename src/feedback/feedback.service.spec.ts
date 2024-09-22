import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackService } from './feedback.service';
import { providersMock } from '../../test/mocks/providers.mock';

describe('FeedbackService', () => {
  let service: FeedbackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [...providersMock],
    }).compile();

    service = module.get<FeedbackService>(FeedbackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
