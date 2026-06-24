import { interviewImage } from "@/constants/index.t";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import DisplayTechIcons from "./DisplayTechIcons";

const InterviewCard = ({
  id,
  role,
  type,
  techstack,
  createdAt,
  coverImage,
}: InterviewCardProps) => {
  const feedback = null as Feedback | null;
  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || "2026-01-01T00:00:00Z"
  ).format("MMM D, YYYY");
  const imageIndex =
    id.split("").reduce((total, character) => total + character.charCodeAt(0), 0) %
    interviewImage.length;
  return (
    <div
      className="group relative min-h-72 w-full max-w-[500px] overflow-hidden rounded-[2rem] border border-primary/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.72),rgba(247,229,208,0.68)_55%,rgba(211,161,120,0.48))] p-1 shadow-[0_24px_60px_rgba(92,56,30,0.14)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(92,56,30,0.2)] sm:w-full"
    >
      <div
        className="relative flex h-full min-h-72 flex-col rounded-[1.7rem] border border-white/55 bg-[linear-gradient(180deg,rgba(78,45,25,0.96),rgba(147,90,48,0.95)_52%,rgba(233,196,148,0.94))] p-5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]"
      >
        <div
          className="absolute right-0 top-0 rounded-bl-2xl border-b border-l border-white/20 bg-[linear-gradient(135deg,#f7dab3,#d6a776)] px-4 py-2 text-right"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-900">
            {normalizedType}
          </p>
        </div>
        <Image
          src={coverImage}
          width={72}
          height={72}
          className="size-[72px] rounded-full border border-white/35 object-cover shadow-lg"
          alt="logo"
        />
        <h3 className="mt-5 font-[family-name:var(--font-montagu-slab)] text-2xl leading-tight text-white">
          {role} Interview
        </h3>
        <section className="mt-3 flex flex-wrap gap-3">
          <p className="rounded-full border border-white/16 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-stone-100/90">
            {formattedDate}
          </p>
          <div className="flex gap-2">
            <p className="rounded-full border border-white/16 bg-stone-950/18 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-stone-50">
              Score: {feedback?.totalScore || "--"}/100
            </p>
          </div>
        </section>

        <h4 className="mt-4 line-clamp-3 max-w-md text-sm leading-6 text-stone-100/88">
          {feedback?.finalAssessment ||
            "You haven't taken the interview yet. Start now to get structured feedback and a clearer sense of your strengths."}
        </h4>
        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <div>
            <DisplayTechIcons techstack={techstack} />
          </div>
          <Button
            className="rounded-full border border-white/15 bg-stone-950/70 px-5 text-stone-100 shadow-lg backdrop-blur-sm hover:scale-100 hover:bg-stone-950/85"
          >
            <Link
              href={feedback ? `/interview/${id}/feedback` : `/interview/${id}`}
            >
              {feedback ? "View Feedback" : "View Interview"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
