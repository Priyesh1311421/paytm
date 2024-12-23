"use client"

import React from "react";
import { Appbar } from "@repo/ui/appbar";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar():JSX.Element {
 
  const session = useSession();
  return <div><Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user}/></div>;
};
