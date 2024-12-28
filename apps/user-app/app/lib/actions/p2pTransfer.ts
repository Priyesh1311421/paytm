"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    if (!from) {
        return {
            message: "Error while sending"
        };
    }

    const toUser = await prisma.user.findUnique({
        where: {
            number: to
        }
    });

    if (!toUser) {
        return {
            message: "User not found"
        };
    }

    if (Number(from) === toUser.id) {
        return {
            message: "Cannot transfer to self"
        };
    }

    try {
        const Transaction = await prisma.$transaction(async (tx) => {
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(toUser.id)} FOR UPDATE`;

            const fromBalance = await tx.balance.findFirst({
                where: { userId: Number(from) },
            });
            if (!fromBalance || fromBalance.amount < amount) {
                throw new Error(`Insufficient funds ${fromBalance?.amount}`);
            }

            await tx.balance.updateMany({
                where:{
                    userId: Number(from)
                },
                data:{
                    amount:{
                        decrement: amount
                    },
                    locked:{
                        increment: amount
                    }
                }
            })

            const transaction = await tx.p2pTransfer.create({
                data:{
                    fromUserId: Number(from),
                    toUserId: toUser.id,
                    amount,
                    timestamp: new Date(),
                    status: "Pending"
                }
            })

            


            await tx.balance.updateMany({
                where: { userId: toUser.id },
                data: { amount: { increment: amount } },
            });

            await tx.balance.updateMany({
                where:{
                    userId: Number(from)
                },
                data:{
                    locked:{
                        decrement: amount
                    }
                }
            })


            await tx.p2pTransfer.update({
                where:{
                    id: transaction.id
                },
                data:{
                    status: "Completed"
                }
            })
            return transaction;

        });

        return {
            message: "Payment  successful",
            transaction: Transaction
        };
    } catch (error) {
       
        console.error(error);
    }
}