import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { VscRobot } from "react-icons/vsc";

const RootPage = () => {
  return (
    <div className="flex justify-between place-items-center bg-[#E0D1D1] shadow-2xl rounded-3xl p-5 md:p-10">
      <section className="flex flex-col gap-4">
        <h1 className="text-4xl font-semibold">
          Ace your interviews with AI-powered practice
        </h1>
        <p className="text-2xl">
          Practice with AI-powered mock interviews to improve your skills and
          confidence.
        </p>
        <Button
          asChild
          className="p-5 w-full text-xl  md:w-fit bg-gradient-to-r
           from-[#231e1e] via-[#69573e] to-[#382a17] text-white hover:scale-105 "
        >
          <Link href="/interview">Start An Interview</Link>
        </Button>
      </section>
      <div className=" hidden md:block">
        <Image
          src="/robot-svgrepo.svg"
          alt="Robot Image"
          width={500}
          height={400}
        />
      </div>
    </div>
  );
};

export default RootPage;
