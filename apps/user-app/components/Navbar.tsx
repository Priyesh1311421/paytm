"use client"

import React from "react";
import { Appbar } from "@repo/ui/appbar";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Navbar():JSX.Element {

  const userupdate = async () =>{
    redirect('/update-profile');
  }

  const home = async () =>{
    redirect('/');
  }
 
  const session = useSession();
  return <div><Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user} update ={userupdate} home={home} /></div>;
};
