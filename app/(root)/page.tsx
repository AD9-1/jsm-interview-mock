import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { VscRobot } from "react-icons/vsc";
import { dummyInterviews } from "@/constants/index.t";
import InterviewCard from "@/components/InterviewCard";

const RootPage = () => {
  return (
    <>
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
      <section className="flex flex-col gap-4 mt-6 ml-3">
        <h2 className="text-4xl font-semibold">Your Interview</h2>
        <div className="flex max-sm:flex-col flex-row gap-6 overflow-x-auto ">
          {dummyInterviews?.map((interview) => {
            return <InterviewCard key={interview.id} {...interview} />;
          })}
   
        </div>
               <p className="text-lg">You haven't taken any interview yet.</p>
      </section>
      <section className="flex flex-col gap-4 mt-6 ml-3">
        <h2 className="text-4xl font-semibold">Take an Interview</h2>

        <div>
          <p className="text-lg">There are no interviews available.</p>
        </div>
      </section>
    </>
  );
};

export default RootPage;
