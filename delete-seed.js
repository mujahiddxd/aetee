import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Cleaning up fake orders...');
  const deleted = await prisma.user.deleteMany({
    where: { email: 'test_limit@example.com' }
  });
  console.log(`✅ Successfully deleted ${deleted.count} test user(s) and all their associated orders!`);
  console.log('You can now checkout normally again.');
}

main().finally(() => prisma.$disconnect());
