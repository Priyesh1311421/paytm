import React from "react";
import UpdateProfile from "../../components/UpdateProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";

export default async function updateUserProfile() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        redirect('/')
    }
  return <div>
    <UpdateProfile />
  </div>;
};

