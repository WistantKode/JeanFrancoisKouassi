import { Test, TestingModule } from '@nestjs/testing';
import { ModerationController } from './moderation.controller';
import { ModerationService } from './moderation.service';
import { BanUserDto } from './dto/ban-user.dto';
import { UserRole } from '@prisma/client';
import { JwtPayload } from '../auth/types/jwt-payload.type';

describe('ModerationController', () => {
  let controller: ModerationController;

  const mockModerationService = {
    banUser: jest.fn(),
    findAllLogs: jest.fn(),
  };

  const mockUser: JwtPayload = {
    sub: 'admin-id',
    email: 'mod@jfk.ci',
    role: UserRole.MODERATOR,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModerationController],
      providers: [
        {
          provide: ModerationService,
          useValue: mockModerationService,
        },
      ],
    }).compile();

    controller = module.get<ModerationController>(ModerationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('banUser', () => {
    it('should ban a user', async () => {
      const dto: BanUserDto = {
        userId: 'target-id',
        reason: 'Spam',
      };

      mockModerationService.banUser.mockResolvedValue({
        id: 'target-id',
        status: 'BANNED',
      });

      const result = await controller.banUser(dto, mockUser);

      expect(mockModerationService.banUser).toHaveBeenCalledWith(
        mockUser.sub,
        dto,
      );
      expect(result).toEqual({ id: 'target-id', status: 'BANNED' });
    });
  });

  describe('findAllLogs', () => {
    it('should return all logs', async () => {
      const logs = [{ id: 'log-1', action: 'USER_BAN' }];
      mockModerationService.findAllLogs.mockResolvedValue(logs);

      const result = await controller.findAllLogs();

      expect(mockModerationService.findAllLogs).toHaveBeenCalled();
      expect(result).toBe(logs);
    });
  });
});
