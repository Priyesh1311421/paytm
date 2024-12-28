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

  const session = await getServerSession(authOptions);
  const from = session?.user?.id;

  if (!from) {
    redirect('/');
  }

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


  const formatAmount = (amount: number) => {
    return `₹${(amount / 100).toFixed(2)}`;
  };


  const formatDate = (timestamp: Date) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const length = transactions.length;

  return (
    <div className="w-full h-full p-6">
        <h1 className="text-2xl font-bold border-b pb-4 mb-4 text-gray-800">
          Recent Transactions
        </h1>
        {length===0 && <div className={`text-xl text-bold uppercase `}> 
          No recent transaction
        </div>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {transactions.map((transaction) => {
            const isSent = transaction.fromUserId === Number(from);
            const amountClass = isSent ? "text-red-500" : "text-green-500";
            const arrowClass = isSent ? "text-red-500" : "transform rotate-180 text-green-500";
            const userName = isSent ? transaction.toUser.name : transaction.fromUser.name;
            const transactionType = isSent ? "Sent to" : "Received from";

            return (
              <div
                key={transaction.id}
                className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 hover:bg-gray-100 transition-all"
              >
                <div className="flex items-center space-x-4">
                  <span className={`font-semibold ${amountClass} text-xl`}>
                    {formatAmount(transaction.amount)}
                  </span>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className={`${arrowClass} bi bi-arrow-up-right`} viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z"/>
                    </svg>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <div className="text-sm text-gray-500">
                  {formatDate(transaction.timestamp)}
                  </div>
                  <div className="font-medium text-lg">
                    {transactionType} <span className="font-semibold text-gray-800">{userName?.split(' ')[0] ? userName.split(' ')[0] : ''}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
    </div>
  );
};

export default RecentTransactionsCard;
