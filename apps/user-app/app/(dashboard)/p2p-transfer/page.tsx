import { SendCard } from "../../../components/SendCard";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../lib/auth";

export default async function P2p() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        redirect('/');
    }
    return <div className="w-full">
        <SendCard /> 
    </div>
}