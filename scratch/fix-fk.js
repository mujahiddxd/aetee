const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fix() {
  try {
    console.log("Dropping existing foreign key constraint...");
    const constraints = await prisma.$queryRaw`
      SELECT CONSTRAINT_NAME 
      FROM information_schema.KEY_COLUMN_USAGE 
      WHERE TABLE_NAME = 'order_items' 
      AND REFERENCED_TABLE_NAME = 'products'
      AND TABLE_SCHEMA = DATABASE();
    `;
    
    console.log("Found constraints:", constraints);
    
    for (const c of constraints) {
      if (c.CONSTRAINT_NAME) {
        console.log(`Dropping constraint ${c.CONSTRAINT_NAME}...`);
        await prisma.$executeRawUnsafe(`ALTER TABLE order_items DROP FOREIGN KEY ${c.CONSTRAINT_NAME};`);
      }
    }
    
    console.log("Successfully dropped constraint. Now run npx prisma db push to recreate it.");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

fix();
