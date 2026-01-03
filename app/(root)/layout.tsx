import Link from "next/link";
import React, { Children } from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="flex flex-col bg-gradient-to-t from-[#E0D1D1] via-[#d0c7c5] to-[#847054] max-w-6xl mx-auto py-12 mt-3 rounded">
        <nav>
          <Link href="/" className="flex gap-2">
            <img src="/logo.png" alt="Logo" className="h-10 w-10" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              MockWise
            </span>
          </Link>
        </nav>
      </div>
      {children}
    </div>
  );
};

export default RootLayout;
