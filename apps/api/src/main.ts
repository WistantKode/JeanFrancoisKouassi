/**
 * @file main.ts
 * @description Point d'entrée de l'application NestJS.
 * Ce fichier est responsable de l'initialisation de l'application, de la configuration
 * des middlewares globaux (sécurité, validation) et du démarrage du serveur.
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

/**
 * La fonction `bootstrap` orchestre le démarrage de l'application.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  const logger = app.get(Logger);

  // --- Sécurité ---

  /**
   * Applique les en-têtes de sécurité HTTP via Helmet.
   * La Content Security Policy (CSP) est configurée pour restreindre les sources
   * de contenu (scripts, styles, images) afin de prévenir les attaques XSS.
   */
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'", 'https:'],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", 'data:', 'https:'],
        },
      },
    }),
  );

  /**
   * Configure le Cross-Origin Resource Sharing (CORS).
   * Lit les origines autorisées depuis la variable d'environnement `CORS_ORIGIN`.
   * Cela permet au frontend (ex: http://localhost:3000) de communiquer avec l'API.
   */
  const corsOrigins = process.env.CORS_ORIGIN?.split(',').map((origin) =>
    origin.trim(),
  ) || ['http://localhost:3000'];

  app.enableCors({
    origin: corsOrigins,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
  });

  logger.log(`CORS enabled for origins: ${corsOrigins.join(', ')}`);

  // --- Validation Globale ---

  /**
   * Applique un `ValidationPipe` global à toutes les requêtes entrantes.
   * - `whitelist: true`: Supprime automatiquement les propriétés non définies dans les DTOs.
   * - `transform: true`: Tente de convertir les types primitifs (ex: string -> number).
   * - `forbidNonWhitelisted: true`: Lève une exception si des propriétés non autorisées sont présentes.
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // --- Documentation de l'API (Swagger) ---

  /**
   * Configure Swagger pour générer une documentation interactive de l'API.
   * Le document est accessible via l'endpoint `/api-docs`.
   */
  const config = new DocumentBuilder()
    .setTitle('JFK Campaign API')
    .setDescription(
      'API pour la plateforme de campagne de Jean-François Kouassi',
    )
    .setVersion('1.0')
    .addBearerAuth() // Ajoute la possibilité de tester les routes protégées avec un token JWT.
    .addTag('Authentication', "Endpoints d'authentification")
    .addTag('Users', 'Gestion des utilisateurs')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // --- Démarrage du Serveur ---

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  logger.log(`🚀 Application is running on: http://localhost:${port}`);
  logger.log(`📚 Swagger docs available at: http://localhost:${port}/api-docs`);
}

// Lancement de l'application.
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
