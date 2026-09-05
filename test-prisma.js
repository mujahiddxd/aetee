const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const result = await prisma.blockedDate.createMany({
      data: [{ date: new Date('2026-09-01T00:00:00Z'), reason: 'test' }],
      skipDuplicates: true,
    });
    console.log("Success:", result);
  } catch (error) {
    console.error("Prisma Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
