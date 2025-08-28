import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

export class AccountServices {

    async getAccounts(userId: number) {
        return prisma.account.findMany({
            where: { userId },
            include: { transactions: true },
        });
    }

    async getTransactions(accountId: number, page: number, limit: number) {
        return prisma.transaction.findMany({
            where: { accountId },
            skip: (page - 1) * limit,
            take: limit,
            orderBy: { createdAt: "desc" },
        });
    }

    async transfer(
        fromAccountId: number,
        beneficiaryAccNo: number,
        beneficiaryBankName: string,
        amount: number,
        description: string
    ) {
        return prisma.$transaction(async (tx) => {

            const from = await tx.account.findUnique({
                where: { id: fromAccountId }
            });

            if(!from) throw new Error("Sender account not found");

            if(new Decimal(from.balance).lessThan(amount)) throw new Error("Insufficent funds");

            await tx.account.update({
                where: { id: fromAccountId },
                data: { balance: { decrement: amount } },
            });

            await tx.transaction.create({
                data: {
                    accountId: fromAccountId,
                    type: "DEBITED",
                    amount,
                    description,
                    beneficiaryAccNo,
                    beneficiaryBankName,
                }
            });

            return { success: true, message: "Transfer successful"};
        });
    }
}