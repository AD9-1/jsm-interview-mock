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
  return (
    <div
      className=" bg-gradient-to-r from-[#c9b5a1] via-[#ecd7b9] to-[#eac087]
   shadow-xl max-sm:w-full w-[360px] min-h-96 rounded p-1 relative"
    >
      <div className="bg-gradient-to-t from-[#4f473e] via-[#be9255] to-[#eac087]
       w-full h-1/6 shadow-xl rounded-[20px] my-1 ">
        <div className="">
          <div className=" absolute top-0 right-0 bg-light-600">
            <p className="text-md font-semibold">{normalizedType}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
