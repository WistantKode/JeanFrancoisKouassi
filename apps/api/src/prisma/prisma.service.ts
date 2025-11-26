/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

@Injectable()
export class PrismaService implements OnModuleInit {
  public client: PrismaClient;

  constructor(private configService: ConfigService) {
    // Prisma 7: Use database adapter for PostgreSQL with pg.Pool
    const connectionString = this.configService.get<string>('DATABASE_URL');

    // DEBUG: Log the connection string (masked)
    if (!connectionString) {
      console.error('❌ DATABASE_URL is undefined in PrismaService!');
    } else {
      const masked = connectionString.replace(/:([^:@]+)@/, ':****@');
      console.log(`✅ PrismaService connecting to: ${masked}`);
    }

    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);

    this.client = new PrismaClient({ adapter });
  }

  /**
   * Connect to the database when the module is initialized.
   */
  async onModuleInit() {
    await this.client.$connect();
  }

  /**
   * Enable shutdown hooks to close the database connection gracefully.
   * @param app NestJS application instance
   */
  async enableShutdownHooks(app: any) {
    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}
