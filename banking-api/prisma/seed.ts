import { PrismaClient } from '@prisma/client';
import dotenv from "dotenv";
import bcrypt from 'bcryptjs';

dotenv.config();
const prisma = new PrismaClient();

async function main() {

  const users = await Promise.all(
    Array.from({ length: 10 }).map(async (_, i) => {
      return prisma.user.create({
        data: {
          username: `user${i + 1}`,
          password: await bcrypt.hash('password123', 10),
        },
      });
    })
  );

  const accounts = await Promise.all(
    users.map((user, i) =>
      prisma.account.create({
        data: {
          userId: user.id,
          balance: 1000 + i * 100,
        },
      })
    )
  );

  await Promise.all(
    accounts.map((account, i) =>
      prisma.transaction.create({
        data: {
          accountId: account.id,
          type: i % 2 === 0 ? 'DEPOSIT' : 'WITHDRAWAL',
          amount: (i + 1) * 50,
          description: `Transaction ${i + 1}`,
        },
      })
    )
  );

  console.log('Seeded 10 users, 10 accounts, 10 transactions.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
