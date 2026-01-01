import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-center items-center mx-auto min-h-screen max-w-6xl  max-sm:px-4 max-sm:py-4 ">
      {children}
    </div>
  );
};

export default AuthLayout;
