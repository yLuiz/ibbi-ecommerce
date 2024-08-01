import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import { categoriesSeed } from './seeds/categories';

const prisma = new PrismaClient();

async function main() {
  const rounds = categoriesSeed.length;
  dotenv.config();
  console.log('Seeding...');
  // Categories
  for (let i = 0; i < rounds; i++) {
    await prisma.category.create({ data: categoriesSeed[i]});
  }
}

main()
  .then(() => { console.log('Done! 🍃')})
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
