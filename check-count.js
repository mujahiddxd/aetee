import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.order.count();
  console.log('Total orders in DB:', count);

  const testDate = new Date('2026-08-03T00:00:00.000Z');
  const countDate = await prisma.order.count({ where: { deliveryDate: testDate } });
  console.log('Total orders for 2026-08-03:', countDate);
}
main().finally(() => prisma.$disconnect());
