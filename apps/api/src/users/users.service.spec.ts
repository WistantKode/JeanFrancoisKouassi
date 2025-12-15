import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { toPublicUserDto } from './entities/user.entity';

// Mock pour PrismaService
const mockPrismaService = {
  user: {
    findUnique: jest.fn(),
    update: jest.fn(),
    findMany: jest.fn(),
    count: jest.fn(),
  },
};

// Donnée utilisateur de test
const userEntity = {
  id: '1',
  email: 'test@example.com',
  password: 'hashedPassword',
  firstName: 'Test',
  lastName: 'User',
  role: 'MEMBER',
  status: 'ACTIVE',
  verificationToken: null,
  verificationTokenExpires: null,
  lastLoginIp: null,
  passwordResetExpires: null,
  passwordResetToken: null,
  createdAt: new Date(),
  updated: new Date(),
  city: null,
  country: 'Côte d"Ivoire',
  dateOfBirth: null,
  emailVerified: true,
  emailVerifiedAt: new Date(),
  gender: null,
  lastLoginAt: null,
  phone: null,
  region: null,
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findById', () => {
    it('should return a public user DTO if user is found', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(userEntity);

      const result = await service.findById('1');
      const expectedPublicUser = toPublicUserDto(userEntity);

      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(result).toEqual(expectedPublicUser);
      expect(result).not.toHaveProperty('password');
    });

    it('should throw NotFoundException if user is not found', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.findById('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateProfile', () => {
    it('should update user profile and return a public DTO', async () => {
      const updateDto = { firstName: 'Updated' };
      const updatedUser = { ...userEntity, ...updateDto };
      mockPrismaService.user.update.mockResolvedValue(updatedUser);

      const result = await service.updateProfile('1', updateDto);
      const expectedPublicUser = toPublicUserDto(updatedUser);

      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: updateDto,
      });
      expect(result).toEqual(expectedPublicUser);
    });
  });

  describe('findAll', () => {
    it('should return a paginated list of public users', async () => {
      const users = [userEntity];
      mockPrismaService.user.findMany.mockResolvedValue(users);
      mockPrismaService.user.count.mockResolvedValue(1);

      const result = await service.findAll(1, 10);

      expect(result.data[0]).not.toHaveProperty('password');
      expect(result.meta.total).toBe(1);
    });
  });

  describe('updateRole', () => {
    it('should update the user role and return a public DTO', async () => {
      const updatedUser = { ...userEntity, role: 'ADMIN' };
      mockPrismaService.user.update.mockResolvedValue(updatedUser);

      const result = await service.updateRole('1', 'ADMIN');

      expect(result).not.toHaveProperty('password');
      expect(result.role).toBe('ADMIN');
    });
  });
});
