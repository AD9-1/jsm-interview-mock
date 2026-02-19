
import { isAuthenticated } from "@/lib/actions/auth.action";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { Children } from "react";
import { FcAssistant } from "react-icons/fc";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {

  const isUserAuth = await isAuthenticated();
  if (!isUserAuth) redirect("/auth/sign-in");
  return (
    <div
      className="flex flex-col bg-gradient-to-t from-[#E0D1D1] via-[#cea79e] to-[#e5d6c2]
       max-w-7xl mx-auto py-8 rounded-bl-[50px] rounded-br-[50px] px-4"
    >
      <nav>
        <Link href="/" className="flex gap-2 items-center ">
          <FcAssistant className="h-20 w-20 md:h-30 md:w-30" />
          <span className=" text-4xl font-semibold whitespace-nowrap dark:text-white md:text-7xl">
            MockWise
          </span>
        </Link>
      </nav>

      {children}
    </div>
  );
};

export default RootLayout;
