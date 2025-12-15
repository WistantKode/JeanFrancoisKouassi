import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailService } from '../mail/mail.service';
import { UnauthorizedException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

// --- MOCKING COMPLET DE BCRYPT ---
// Ceci remplace toute la bibliothèque bcrypt par notre fausse implémentation
jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

// Mocks pour les autres dépendances
const mockPrismaService = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};

const mockJwtService = {
  signAsync: jest.fn(),
};

const mockConfigService = {
  getOrThrow: jest.fn(),
};

const mockMailService = {
  sendVerificationEmail: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
        { provide: MailService, useValue: mockMailService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should create a new user and send a verification email', async () => {
      const registerDto = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
      };
      const hashedPassword = 'hashedPassword';
      const createdUser = { id: '1', ...registerDto, status: 'PENDING' };

      mockPrismaService.user.findUnique.mockResolvedValue(null);
      // On utilise directement le mock de bcrypt
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      mockPrismaService.user.create.mockResolvedValue(createdUser);

      const result = await service.register(registerDto);

      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: registerDto.email },
      });
      expect(mockPrismaService.user.create).toHaveBeenCalledWith(
        expect.objectContaining({
          email: registerDto.email,
          password: hashedPassword,
          status: 'PENDING',
        }),
      );
      expect(mockMailService.sendVerificationEmail).toHaveBeenCalled();
      expect(result).toEqual({
        message:
          'Si un compte avec cet email n"existe pas, un email de vérification a été envoyé.',
      });
    });

    it('should return a generic message if email already exists', async () => {
      const registerDto = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
      };
      mockPrismaService.user.findUnique.mockResolvedValue({ id: '1' });

      const result = await service.register(registerDto);

      expect(mockPrismaService.user.create).not.toHaveBeenCalled();
      expect(result).toEqual({
        message:
          'Si un compte avec cet email n"existe pas, un email de vérification a été envoyé.',
      });
    });
  });

  describe('login', () => {
    it('should return user and tokens for valid credentials and active user', async () => {
      const loginDto = { email: 'test@example.com', password: 'password123' };
      const user = {
        id: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
        status: 'ACTIVE',
        role: 'MEMBER',
      };

      mockPrismaService.user.findUnique.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      mockJwtService.signAsync.mockResolvedValue('token');

      const result = await service.login(loginDto);

      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('accessToken', 'token');
      expect(result).toHaveProperty('refreshToken', 'token');
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      const loginDto = { email: 'test@example.com', password: 'wrongpassword' };
      const user = {
        id: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
        status: 'ACTIVE',
      };

      mockPrismaService.user.findUnique.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException for a PENDING user', async () => {
      const loginDto = { email: 'test@example.com', password: 'password123' };
      const user = {
        id: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
        status: 'PENDING',
      };

      mockPrismaService.user.findUnique.mockResolvedValue(user);

      await expect(service.login(loginDto)).rejects.toThrow(
        new UnauthorizedException(
          'Veuillez vérifier votre email avant de vous connecter.',
        ),
      );
    });
  });

  describe('verifyEmail', () => {
    it('should activate user and return tokens for a valid verification token', async () => {
      const token = 'validToken';
      const hashedToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');
      const user = {
        id: '1',
        verificationToken: hashedToken,
        verificationTokenExpires: new Date(Date.now() + 3600000),
        role: 'MEMBER',
        email: 'test@example.com',
      };

      mockPrismaService.user.findUnique.mockResolvedValue(user);
      mockPrismaService.user.update.mockResolvedValue({
        ...user,
        status: 'ACTIVE',
        verificationToken: null,
      });
      mockJwtService.signAsync.mockResolvedValue('token');

      const result = await service.verifyEmail(token);

      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: { id: user.id },
        data: expect.objectContaining({
          status: 'ACTIVE',
          verificationToken: null,
        }),
      });
      expect(result).toHaveProperty('accessToken');
    });

    it('should throw BadRequestException for an invalid token', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);
      await expect(service.verifyEmail('invalidToken')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException for an expired token', async () => {
      const token = 'expiredToken';
      const hashedToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');
      const user = {
        id: '1',
        verificationToken: hashedToken,
        verificationTokenExpires: new Date(Date.now() - 3600000),
      };

      mockPrismaService.user.findUnique.mockResolvedValue(user);

      await expect(service.verifyEmail(token)).rejects.toThrow(
        new BadRequestException('Le lien de vérification a expiré.'),
      );
    });
  });
});
