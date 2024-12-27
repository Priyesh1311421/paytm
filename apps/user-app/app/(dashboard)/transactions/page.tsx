import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../lib/auth";
import RecentTransactionsCard from "../../../components/RecentTransactionsCard";

export default async function Transactions() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        redirect('/');
    }
    return <div className="w-full">
        <RecentTransactionsCard take={20}/>
    </div>
}