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
  /**
   * Envoie un email de réinitialisation de mot de passe.
   * @param user L'utilisateur demandant la réinitialisation.
   * @param token Le token de réinitialisation.
   */
  async sendPasswordResetEmail(user: User, token: string) {
    const frontUrl = this.configService.getOrThrow<string>('FRONT_URL');
    const resetUrl = `${frontUrl.replace(/\/$/, '')}/auth/reset-password?token=${token}`;

    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Réinitialisation de votre mot de passe',
        html: `
          <h1>Bonjour ${user.firstName},</h1>
          <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
          <p>Veuillez cliquer sur le lien ci-dessous pour définir un nouveau mot de passe :</p>
          <a href="${resetUrl}">Réinitialiser mon mot de passe</a>
          <p>Ce lien expirera dans 1 heure. Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet email.</p>
        `,
      });
      this.logger.log(`Email de réinitialisation envoyé à ${user.email}`);
    } catch (error) {
      this.logger.error(
        `Échec de l'envoi de l'email de réinitialisation à ${user.email}`,
        error,
      );
    }
  }
}
