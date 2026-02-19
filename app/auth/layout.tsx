import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuth = await isAuthenticated();
  if (!isUserAuth) redirect("/auth/sign-in");
  else redirect("/");
  return (
    <div className="flex justify-center items-center mx-auto min-h-screen max-w-6xl  max-sm:px-4 max-sm:py-4 ">
      {children}
    </div>
  );
};

export default AuthLayout;
