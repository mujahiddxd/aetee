import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const TEST_DATE = new Date('2026-08-03T00:00:00.000Z'); // Monday 3 Aug 2026

  console.log('Seeding 24 dummy PAID orders for', TEST_DATE.toDateString(), '(leaving 1 slot)...');

  // 1. Create a dummy user
  const dummyUser = await prisma.user.upsert({
    where: { email: 'test_limit@example.com' },
    update: {},
    create: {
      firstName: 'Test',
      lastName: 'Limit',
      email: 'test_limit@example.com',
      phone: '9999999999',
    },
  });

  // 2. Inject 24 PAID orders for the target date (capacity is 25, leaving 1 spot open)
  for (let i = 0; i < 24; i++) {
    await prisma.order.create({
      data: {
        userId: dummyUser.id,
        totalAmount: 500,
        status: 'PAID',
        deliveryDate: TEST_DATE,
        razorpayOrderId: `dummy_order_${Date.now()}_${i}`,
      },
    });
  }

  console.log('✅ Successfully seeded 24 orders! 1 spot remaining out of 25.');
  console.log('Now go to your browser checkout, select', TEST_DATE.toDateString(), 'as your delivery date, and click checkout.');
  console.log('It should instantly block you with a fully booked message!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
