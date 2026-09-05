const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Creating blocked_dates table in the correct database...");
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS \`blocked_dates\` (
        \`id\`         VARCHAR(191) NOT NULL,
        \`date\`       DATE         NOT NULL,
        \`reason\`     VARCHAR(255) NULL,
        \`created_at\` DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        \`updated_at\` DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

        UNIQUE INDEX \`blocked_dates_date_key\`(\`date\`),
        PRIMARY KEY (\`id\`)
      ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    `);
    console.log("Table created successfully!");
  } catch (error) {
    console.error("Error creating table:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
