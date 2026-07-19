const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const p = await prisma.product.findFirst({
    where: { name: 'asfasf' }
  });
  console.log(p);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
