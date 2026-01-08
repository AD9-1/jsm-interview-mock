import { interviewImage } from "@/constants/index.t";
import dayjs from "dayjs";
import Image from "next/image";
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
  const getRandomImage=()=>{
return interviewImage[Math.floor(Math.random() * interviewImage.length)];
  }
  return (
    <div
      className=" bg-gradient-to-r from-[#c9b5a1] via-[#ecd7b9] to-[#eac087]
   shadow-xl max-sm:w-full w-[360px] min-h-96 rounded py-.5 px-1 relative"
    >
      <div className="bg-gradient-to-t from-[#4f473e] via-[#be9255] to-[#eac087]
       w-full p-2 shadow-xl rounded-[20px] my-1 ">
        <div className="">
          <div className=" absolute top-0 right-0 bg-gradient-to-r from-[#a88461]
           to-[#d2b790] p-1 rounded-bl-lg">
            <p className="text-md font-semibold">{normalizedType}</p>
          </div>
          <Image src={getRandomImage()} width={50} height={50} 
          className="size-[50px] rounded object-fill" alt="logo"></Image>
        <h3 className=" text-lg font-stretch-50%">{role} Interview</h3>
        
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
