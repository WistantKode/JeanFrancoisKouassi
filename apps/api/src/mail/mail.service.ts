import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Envoie un email de vérification à un nouvel utilisateur.
   * @param user L'utilisateur qui vient de s'inscrire.
   * @param token Le token de vérification à inclure dans le lien.
   */
  async sendVerificationEmail(user: User, token: string) {
    const frontUrl = this.configService.getOrThrow<string>('FRONT_URL');
    const verificationUrl = `${frontUrl.replace(/\/$/, '')}/auth/verify?token=${token}`;

    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Bienvenue ! Confirmez votre adresse email',
        html: `
          <h1>Bonjour ${user.firstName},</h1>
          <p>Merci de vous être inscrit. Veuillez cliquer sur le lien ci-dessous pour vérifier votre adresse email :</p>
          <a href="${verificationUrl}">Vérifier mon email</a>
          <p>Ce lien expirera dans 1 heure.</p>
        `,
      });
      this.logger.log(`Email de vérification envoyé à ${user.email}`);
    } catch (error) {
      this.logger.error(
        `Échec de l'envoi de l'email de vérification à ${user.email}`,
        error,
      );
    }
  }
}
