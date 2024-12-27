import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { ProfileCard } from "../../../components/ProfileCard";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        redirect('/');
    }

    const userBalance = await prisma.balance.findFirst({
        where: {
            userId: Number(session.user.id)
        },
        select: {
            amount: true,
        },
    });

    const user = await prisma.user.findUnique({
        where: {
            id: Number(session.user.id)
        },
        select: {
            name: true,
            email: true,
        },
    });

    const balance = userBalance?.amount || 0;
    const name = user?.name || "User";
    const imgSrc = "https://avatar.iran.liara.run/public"; // Replace with actual image source

    return (
        <div className="container mx-auto p-6 ">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Dashboard </h1>
            <ProfileCard name={name} imgSrc={imgSrc} balance={balance} />
        </div>
    );
}