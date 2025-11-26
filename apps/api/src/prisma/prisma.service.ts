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

  async onModuleInit() {
    await this.client.$connect();
  }

  async enableShutdownHooks(app: any) {
    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}
