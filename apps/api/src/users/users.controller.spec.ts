import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';
import { UpdateProfileDto, ChangeRoleDto } from './dto';
import { JwtPayload } from '../auth/types/jwt-payload.type';
import { UserRole } from '@prisma/client';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService; // Declare service to spy on it

  // Mock data (assuming these are defined elsewhere or need to be mocked)
  const mockUser = { sub: 'user-id', email: 'test@example.com', role: UserRole.USER };
  const mockPublicUser = { id: 'user-id', email: 'test@example.com', role: UserRole.USER, firstName: 'Test', lastName: 'User' };


  const mockUsersService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    updateProfile: jest.fn(), // Add mock for updateProfile
    updateRole: jest.fn(), // Add mock for updateRole
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'ENABLE_USER_ADMIN_ENDPOINTS') return 'true';
              return null;
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService); // Get the service instance
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
