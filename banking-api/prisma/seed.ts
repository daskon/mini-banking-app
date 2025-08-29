import { PrismaClient } from '@prisma/client';
import dotenv from "dotenv";
import bcrypt from 'bcryptjs';
import { Decimal } from '@prisma/client/runtime/library';

dotenv.config();
const prisma = new PrismaClient();

async function main() {

  const users = await Promise.all(
    Array.from({ length: 20 }).map(async (_, i) => {
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
          id: 10000001 + i,
          userId: user.id,
          balance: new Decimal((1000 + i * 100).toFixed(2)),
        },
      })
    )
  );

  const fakeBanks = [
    'Sampath Bank',
    'DFCC Bank',
    'National Bank',
    'Global Trust Bank',
    'City Bank',
    'HNB Bank',
    'Peoples Bank',
    'BOC Bank'
  ];

  await Promise.all(
  accounts.map(async (account, i) => {
    const transactionsCount = 15;
      return Promise.all(
        Array.from({ length: transactionsCount }).map((_, j) => {
          return prisma.transaction.create({
            data: {
              accountId: account.id,
              type: j % 2 === 0 ? 'DEPOSIT' : 'WITHDRAWAL',
              amount: new Decimal(((i + 1) * 50 + j * 10).toFixed(2)),
              description: `Transaction ${j + 1} for account ${account.id}`,
              beneficiaryAccNo: 10300001 + j,
              beneficiaryBankName: fakeBanks[(i + j) % fakeBanks.length],
            },
          });
        })
      );
    })
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
