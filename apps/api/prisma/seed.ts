/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

// Créer le client Prisma avec l'adaptateur PostgreSQL
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Démarrage du seed de la base de données...\n');

  // Vérifier si un admin existe déjà
  const existingAdmin = await prisma.user.findFirst({
    where: { role: 'SUPER_ADMIN' },
  });

  if (existingAdmin) {
    console.log('Un utilisateur SUPER_ADMIN existe déjà');
    console.log(`   Email: ${existingAdmin.email}`);
    console.log(
      `   Nom: ${existingAdmin.firstName} ${existingAdmin.lastName}\n`,
    );
    return;
  }

  // Créer l'utilisateur admin
  const hashedPassword = await bcrypt.hash('Admin123!', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@jfk-campaign.ci',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'JFK',
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
      emailVerified: true,
    },
  });

  console.log('Utilisateur SUPER_ADMIN créé avec succès !');
  console.log(`   Email: ${admin.email}`);
  console.log(`   Password: Admin123!`);
  console.log(`   Role: ${admin.role}`);
  console.log(`   ID: ${admin.id}\n`);

  console.log('Seed terminé avec succès !');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
