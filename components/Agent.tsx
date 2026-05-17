import Image from "next/image";
import React from "react";
enum CallStatus {
  IDLE = "IDLE",
  SPEAKING = "SPEAKING",
  LISTENING = "LISTENING",
  FINISHED = "FINISHED",
}
const Agent = ({ name }: SignUpParams) => {
  const isSpeaking = true;
  return (
    <>
      <div className="flex flex-col gap-6 md:flex-row md:justify-center md:items-center">
        <div className="max-w-full  md:min-w-[320px] lg:w-[400px] border border-1  bg-gradient-to-b from-[rgba(191,102,23,0.54)] to-[rgba(219,200,22,0.11)] rounded-[1.75rem] p-6 shadow-[rgba(255,255,255,0.7)]">
          <div
            className={`w-fit mx-auto rounded-full p-1 border-2 border-[#644e2a] ${isSpeaking ? "speaking-ring" : ""}`}
          >
            <Image
              src="/ai-avatar.jpg"
              alt="AI Avatar"
              width={100}
              height={100}
              className="rounded-full w-36 h-36 object-cover"
            />
          </div>
          <h3 className="mt-4 text-center font-[family-name:var(--font-montagu-slab)] text-shadow-blue-300 font-bold">
            AI Interviewer
          </h3>
        </div>
        <div className="max-w-full md:min-w-[320px] lg:w-[400px] border border-1  bg-gradient-to-b from-[rgba(191,102,23,0.54)] to-[rgba(219,200,22,0.11)] rounded-[1.75rem] p-6 shadow-[rgba(255,255,255,0.7)]">
          <div
            className={`w-fit mx-auto rounded-full p-1 border-2 border-[#644e2a] ${isSpeaking ? "speaking-ring" : ""}`}
          >
            <Image
              src="/ai-avatar.jpg"
              alt="AI Avatar"
              width={100}
              height={100}
              className="rounded-full w-36 h-36 object-cover"
            />
          </div>
          <h3 className="mt-4 text-center font-[family-name:var(--font-montagu-slab)] text-shadow-blue-300 font-bold">
            {name || "You"}
          </h3>
        </div>
      </div>
      <div className="w-full flex justify-center">
        {CallStatus.IDLE === "IDLE" ? (
          <button>
            <span>{CallStatus.IDLE || CallStatus.FINISHED?'Call':'...'}</span>
          </button>
        ) : (
          <button></button>
        )}
      </div>
    </>
  );
};

export default Agent;
