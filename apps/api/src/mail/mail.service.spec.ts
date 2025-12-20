import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import { MailerService } from '@nestjs-modules/mailer';

// Mock pour MailerService
const mockMailerService = {
  sendMail: jest.fn(),
};

describe('MailService', () => {
  let service: MailService;
  let mailerService: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        { provide: MailerService, useValue: mockMailerService },
      ],
    }).compile();

    service = module.get<MailService>(MailService);
    mailerService = module.get<MailerService>(MailerService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendVerificationEmail', () => {
    it('should call mailerService.sendMail with the correct parameters', async () => {
      const user = { id: '1', email: 'test@example.com', firstName: 'Test' };
      const token = 'verificationToken';
      const verificationUrl = `http://localhost:3000/auth/verify?token=${token}`;

      await service.sendVerificationEmail(user as any, token);

      expect(mailerService.sendMail).toHaveBeenCalledWith({
        to: user.email,
        subject: 'Bienvenue ! Confirmez votre adresse email',
        html: expect.stringContaining(verificationUrl),
      });
    });

    it('should log an error if sending mail fails', async () => {
      const user = { id: '1', email: 'test@example.com', firstName: 'Test' };
      const token = 'verificationToken';
      const error = new Error('Mail server is down');
      mockMailerService.sendMail.mockRejectedValue(error);

      // On espionne le logger pour vérifier qu'il est appelé
      const loggerErrorSpy = jest.spyOn(service['logger'], 'error');

      await service.sendVerificationEmail(user as any, token);

      expect(loggerErrorSpy).toHaveBeenCalledWith(
        `Échec de l'envoi de l'email de vérification à ${user.email}`,
        error,
      );
    });
  });
});
