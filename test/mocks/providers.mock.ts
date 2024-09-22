import { getRepositoryToken } from '@nestjs/typeorm';
import { Equipment } from '../../src/equipment/equipment.entity';
import { EquipmentService } from '../../src/equipment/equipment.service';
import { TreatmentCategory } from '../../src/treatment-category/treatment-category.entity';
import { TreatmentCategoryService } from '../../src/treatment-category/treatment-category.service';
import { TreatmentGroup } from '../../src/treatment-group/treatment-group.entity';
import { TreatmentGroupService } from '../../src/treatment-group/treatment-group.service';
import { Treatment } from '../../src/treatment/treatment.entity';
import { TreatmentService } from '../../src/treatment/treatment.service';
import { User } from '../../src/user/user.entity';
import { UserService } from '../../src/user/user.service';
import { FeedbackService } from '../../src/feedback/feedback.service';
import { Feedback } from '../../src/feedback/feedback.entity';
import { AppointmentService } from '../../src/appointment/appointment.service';
import { Appointment } from '../../src/appointment/appointment.entity';

export const providersMock = [
  AppointmentService,
  {
    provide: getRepositoryToken(Appointment),
    useValue: {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    },
  },
  FeedbackService,
  {
    provide: getRepositoryToken(Feedback),
    useValue: {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    },
  },
  UserService,
  {
    provide: getRepositoryToken(User),
    useValue: {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    },
  },
  EquipmentService,
  {
    provide: getRepositoryToken(Equipment),
    useValue: {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    },
  },
  TreatmentService,
  {
    provide: getRepositoryToken(Treatment),
    useValue: {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    },
  },
  TreatmentCategoryService,
  {
    provide: getRepositoryToken(TreatmentCategory),
    useValue: {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    },
  },
  TreatmentGroupService,
  {
    provide: getRepositoryToken(TreatmentGroup),
    useValue: {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    },
  },
];
