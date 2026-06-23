import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import React from "react";

import { dummyInterviews } from "@/constants/index.t";
import InterviewCard from "@/components/InterviewCard";
import {
  getCurrentUser,
  getInterviewQuestionsbyUserId,
} from "@/lib/actions/auth.action";

const RootPage = async () => {
  const user = await getCurrentUser();

  const userId = user?.uid;
  const userInterviews = userId
    ? await getInterviewQuestionsbyUserId(userId!)
    : [];
  console.log("interviews in page.tsx", userInterviews);
  const hasPastInterviews = userInterviews?.length > 0;

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[2.25rem] border border-primary/10 bg-[linear-gradient(135deg,rgba(255,251,245,0.9),rgba(249,226,199,0.92)_48%,rgba(205,152,110,0.82))] px-6 py-8 shadow-[0_30px_90px_rgba(101,58,31,0.16)] md:px-10 md:py-12">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.55),transparent_64%)] lg:block" />
        <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <section className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-primary/70">
              Your Interview Lab
            </p>
            <h1 className="font-[family-name:var(--font-montagu-slab)] text-4xl leading-tight text-foreground sm:text-5xl md:text-6xl">
              Ace your interviews with AI-powered practice
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-foreground/72 md:text-xl">
              Practice with focused mock interviews, build consistency, and walk
              into real conversations with stronger answers and calmer nerves.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-[linear-gradient(135deg,#4f220e,#8e5530,#c18049)] px-8 text-base text-white shadow-[0_18px_44px_rgba(88,45,20,0.28)] hover:-translate-y-0.5 hover:bg-[linear-gradient(135deg,#5a2a12,#99603a,#cb8b54)]"
              >
                <Link href="/interview">Start An Interview</Link>
              </Button>
              <div className="flex items-center rounded-full border border-primary/10 bg-white/65 px-5 py-3 text-sm font-medium text-foreground/65">
                Structured mock rounds across technical and mixed interviews
              </div>
            </div>
          </section>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/65">
              Recent Sessions
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-montagu-slab)] text-3xl font-semibold text-foreground md:text-4xl">
              Your Interviews
            </h2>
          </div>
          <p className="hidden text-sm text-foreground/60 md:block">
            Pick up where you left off.
          </p>
        </div>
        <div className="grid gap-6 xl:grid-cols-2">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => {
              return <InterviewCard key={interview.id} {...interview} />;
            })
          ) : (
            <p className="rounded-[1.5rem] border border-dashed border-primary/15 bg-white/45 px-5 py-4 text-base text-foreground/65">
              You haven&apos;t taken any interview yet.
            </p>
          )}
        </div>
      </section>

      <section className="rounded-[2rem] border border-primary/10 bg-white/45 px-6 py-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/65">
          Open Queue
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-montagu-slab)] text-3xl font-semibold text-foreground md:text-4xl">
          Take an Interview
        </h2>
        <p className="mt-4 text-lg text-foreground/68">
          There are no interviews available.
        </p>
      </section>
    </div>
  );
};

export default RootPage;
