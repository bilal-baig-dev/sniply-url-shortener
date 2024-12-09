import React from "react";
import { getSession } from "@/actions/auth";
import { ButtonSignin } from "./ButtonSignin";
import UserAccount from "./UserAccount";
import Link from "next/link";

async function UserLogin() {
  const session = await getSession();
  return (
    <>
      {!session?.user ? (
        <Link href={"/login"}>
          <ButtonSignin text={"Signin"} size={"lg"} />
        </Link>
      ) : (
        <UserAccount name={session?.user?.name || session?.user?.email} image={session?.user?.image} />
      )}
    </>
  );
}

export default UserLogin;
