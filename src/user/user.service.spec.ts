import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Equipment } from '../equipment/equipment.entity';
import { EquipmentService } from '../equipment/equipment.service';
import { TreatmentCategory } from '../treatment-category/treatment-category.entity';
import { TreatmentCategoryService } from '../treatment-category/treatment-category.service';
import { TreatmentGroup } from '../treatment-group/treatment-group.entity';
import { TreatmentGroupService } from '../treatment-group/treatment-group.service';
import { Treatment } from '../treatment/treatment.entity';
import { TreatmentService } from '../treatment/treatment.service';

describe('UserService', () => {
  let service: UserService;
  let userRepository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(User));
  });

  describe('login', () => {
    it('should login successfully', async () => {
      const user = {
        id: 1,
        email: 'test@test.com',
        password: 'hashedPassword',
        role: 'user',
      };
      userRepository.findOne.mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      const result = await service.login('test@test.com', 'password');
      expect(result).toEqual(user);
    });

    it('should throw NotFoundException if email not found', async () => {
      userRepository.findOne.mockResolvedValue(null);

      await expect(service.login('test@test.com', 'password')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException if password is invalid', async () => {
      const user = {
        id: 1,
        email: 'test@test.com',
        password: 'hashedPassword',
        role: 'user',
      };
      userRepository.findOne.mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      await expect(service.login('test@test.com', 'password')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findById', () => {
    it('should find user by ID successfully', async () => {
      const user = { id: 1, email: 'test@test.com' };
      userRepository.findOne.mockResolvedValue(user);

      const result = await service.findById(1);
      expect(result).toEqual(user);
    });

    it('should throw NotFoundException if user not found by ID', async () => {
      userRepository.findOne.mockResolvedValue(null);

      await expect(service.findById(1)).rejects.toThrow();
    });
  });

  describe('create', () => {
    it('should create a user successfully', async () => {
      const createUserDto = {
        name: 'Teste',
        phone: '(31) 99999-9999',
        address: '',
        email: 'test@test.com',
        password: 'password',
        role: 'user',
      };
      const hashedPassword = 'hashedPassword';
      const user = { id: 1, ...createUserDto, password: hashedPassword };
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);
      userRepository.create.mockReturnValue(user);
      userRepository.save.mockResolvedValue(user);

      const result = await service.create(createUserDto);
      expect(result).toEqual(user);
    });
  });

  describe('update', () => {
    it('should update a user successfully', async () => {
      const updateUserDto = {
        email: 'updated@test.com',
        password: 'newPassword',
      };
      const user = {
        id: 1,
        name: 'Teste',
        phone: '(31) 99999-9999',
        email: 'test@test.com',
        password: 'hashedPassword',
        role: 'user',
        address: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const updatedUser = {
        ...user,
        ...updateUserDto,
        password: 'newHashedPassword',
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('newHashedPassword');
      userRepository.save.mockResolvedValue(updatedUser);

      const result = await service.update(1, updateUserDto);
      expect(result).toEqual(updatedUser);
    });

    it('should throw NotFoundException if user not found for update', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      await expect(
        service.update(1, { email: 'updated@test.com' }),
      ).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should remove a user successfully', async () => {
      userRepository.delete.mockResolvedValue({ affected: 1 });

      await expect(service.remove(1)).resolves.not.toThrow();
    });

    it('should throw NotFoundException if user not found for removal', async () => {
      userRepository.delete.mockResolvedValue({ affected: 0 });

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
