import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransaction";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";


interface Transaction {
    startTime: Date;
    amount: number;
    status: string;
    provider: string;
}

async function getBalance() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        redirect('/');
        return null;
    }
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns.map((t:Transaction) => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

export default async function Transfer() {
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();

    return <div className="pr-2 w-full">
        <div className="flex items-center justify-center text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            <span>Transfer</span>
        </div>
        <div className="grid grid-col-1 sm:grid-cols-2 gap-4 p-4 max-md:p-0 max-md:pr-2 w-full">
            <div>
                <AddMoney />
            </div>
            <div className="flex flex-col">
                <BalanceCard amount={balance?.amount || 0} locked={balance?.locked || 0} />
                <div className="pt-4">
                    <OnRampTransactions transactions={transactions} />
                </div>
            </div>
        </div>
    </div>
}