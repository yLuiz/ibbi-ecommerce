import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import { categoriesSeed } from './seeds/categories';
import { prodcuts } from './seeds/products';
import { user } from './seeds/user';

const prisma = new PrismaClient();

async function main() {
  dotenv.config();
  console.log('Seeding...');

  // User
  await prisma.user.create({ data: user });

  // Categories
  for (let c of categoriesSeed) {
    await prisma.category.create({ data: c });
  }

  // Products
  for (let p of prodcuts) {
    await prisma.product.create({
      data: p,
    });
  }
}

main()
  .then(() => {
    console.log('Done! 🍃');
  })
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
