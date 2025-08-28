const { PrismaClient } = require('@prisma/client');
const { execSync } = require('child_process');

const prisma = new PrismaClient();

async function main() {
  try {
    // Check if any table is empty
    const [userCount, accountCount, transactionCount] = await Promise.all([
      prisma.user.count(),
      prisma.account.count(),
      prisma.transaction.count(),
    ]);

    if (userCount === 0 || accountCount === 0 || transactionCount === 0) {
      console.log("One or more tables are empty. Running seed...");
      execSync('npx ts-node prisma/seed.ts', { stdio: 'inherit' });
    } else {
      console.log("All tables have data. Skipping seed...");
    }
  } catch (error) {
    console.error("Error checking or seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();