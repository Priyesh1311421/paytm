import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";
import { redirect } from "next/navigation";

interface Transaction {
  id: number;
  amount: number;
  timestamp: string;
  fromUserId: number;
  toUserId: number;
  fromUser: { name: string };
  toUser: { name: string };
}

const RecentTransactionsCard = async ({ take }: { take: number }) => {
  // Fetch session and user id
  const session = await getServerSession(authOptions);
  const from = session?.user?.id;

  if (!from) {
    redirect('/');
  }

  // Fetch the user's transactions
  const transactions = await prisma.p2pTransfer.findMany({
    where: {
      OR: [
        { fromUserId: Number(from) },
        { toUserId: Number(from) },
      ],
    },
    include: {
      fromUser: { select: { name: true } },
      toUser: { select: { name: true } },
    },
    orderBy: {
      timestamp: 'desc',
    },
    take: take,
  });

  // Helper function to format the amount
  const formatAmount = (amount: number) => {
    return `₹${(amount / 100).toFixed(2)}`;
  };

  return (
    <div className="w-full h-full p-6">
      <div className="border rounded-lg shadow-md p-6 bg-white w-full">
        <h1 className="text-2xl font-bold border-b pb-4 mb-4 text-gray-800">
          Recent Transactions
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {transactions.map((transaction) => {
            const isSent = transaction.fromUserId === Number(from);
            const amountClass = isSent ? "text-red-500" : "text-green-500";
            const arrowClass = isSent ? "transform rotate-45 bg-red-500" : "transform rotate-135 bg-green-500";
            const userName = isSent ? transaction.toUser.name : transaction.fromUser.name;
            const transactionType = isSent ? "Sent to" : "Received from";

            return (
              <div
                key={transaction.id}
                className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 hover:bg-gray-100 transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className={`${arrowClass} w-6 h-6`} />
                  <span className={`font-semibold ${amountClass} text-xl`}>
                    {formatAmount(transaction.amount)}
                  </span>
                </div>

                <div className="flex flex-col items-end">
                  <div className="text-sm text-gray-500">
                    {new Date(transaction.timestamp).toLocaleString()}
                  </div>
                  <div className="font-medium text-lg">
                    {transactionType} <span className="font-semibold text-gray-800">{userName}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecentTransactionsCard;
