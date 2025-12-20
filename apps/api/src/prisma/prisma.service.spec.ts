import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';
import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';

// Mock pour ConfigService
const mockConfigService = {
  getOrThrow: jest
    .fn()
    .mockReturnValue('postgresql://user:password@localhost:5432/testdb'),
};

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should connect on module init', async () => {
    // Le spyOn permet d'espionner l'appel à la méthode $connect
    const connectSpy = jest.spyOn(service, '$connect').mockResolvedValue();
    await service.onModuleInit();
    expect(connectSpy).toHaveBeenCalled();
  });

  it('should set up shutdown hooks', () => {
    const mockApp = {
      close: jest.fn(),
    } as unknown as INestApplication;

    // On espionne process.on pour voir s'il est appelé avec les bons arguments
    const processOnSpy = jest.spyOn(process, 'on');
    service.enableShutdownHooks(mockApp);
    expect(processOnSpy).toHaveBeenCalledWith(
      'beforeExit',
      expect.any(Function),
    );
  });
});
