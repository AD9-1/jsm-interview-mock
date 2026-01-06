import dayjs from "dayjs";
import React from "react";

const InterviewCard = ({
  id,
  role,
  type,
  userId,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback = null as Feedback | null;
  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D, YYYY");
  return <div className="border border-gray-200 shadow-lg max-sm:w-full w-[360px] min-h-96  ">

  </div>;
};

export default InterviewCard;
