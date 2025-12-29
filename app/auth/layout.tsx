import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex item-center justify-center mx-auto max-w-6xl h-screen max-sm:px-4 max-sm:py-4 ">
      {children}
    </div>
  );
};

export default AuthLayout;
