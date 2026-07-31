import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('--- DEBUGGING CAPACITY COUNT ---');
  
  const datesToCheck = [
    '2026-08-05',
    '2026-08-06',
    '2026-08-07',
    '2026-10-10'
  ];

  for (const d of datesToCheck) {
    const targetDate = new Date(d);
    const fifteenMinsAgo = new Date(Date.now() - 15 * 60 * 1000);

    const capacityCount = await prisma.order.count({
      where: {
        deliveryDate: targetDate,
        OR: [
          { status: 'PAID' },
          { status: 'PENDING', createdAt: { gte: fifteenMinsAgo } }
        ]
      },
    });

    console.log(`Capacity for ${d}: ${capacityCount} orders`);
  }
  console.log('--------------------------------');
}

main().finally(() => prisma.$disconnect());
