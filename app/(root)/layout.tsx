import { getCurrentUser } from "@/lib/actions/auth.action";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { FcAssistant } from "react-icons/fc";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();
  if (currentUser === null) redirect("/auth/sign-in");
  console.log("current user in layout", currentUser);

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
      <div className="panel overflow-hidden px-5 py-6 sm:px-8 sm:py-8">
        <nav className="mb-8 flex items-center justify-between border-b border-primary/10 pb-5">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/80 shadow-sm sm:h-16 sm:w-16">
              <FcAssistant className="h-9 w-9 sm:h-10 sm:w-10" />
            </span>
            <span className="font-[family-name:var(--font-montagu-slab)] text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              MockWise
            </span>
          </Link>
          <p className="hidden rounded-full border border-primary/10 bg-white/70 px-4 py-2 text-sm font-medium text-foreground/65 md:block">
            Practice. Review. Improve.
          </p>
        </nav>

        <div className="pb-2">{children}</div>
      </div>
    </div>
  );
};

export default RootLayout;
