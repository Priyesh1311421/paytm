"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function updateUserProfile(name: string, email: string) {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    if (!userId) {
        return {
            message: "Error while updating profile"
        };
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { id: Number(userId) },
            data: { name, email },
        });

        return {
            message: "Profile updated successfully",
            user: updatedUser
        };
    } catch (error) {
        console.error('Failed to update profile', error);
        return {
            message: "Failed to update profile",
            error: error
        };
    }
}