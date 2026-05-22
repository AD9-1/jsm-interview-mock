import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
enum CallStatus {
  IDLE = "IDLE",
  CONNECTING = "CONNECTING",
  FINISHED = "FINISHED",
}
const Agent = ({ name }: SignUpParams) => {
  const isSpeaking = true;
  const messages = [
    "what is your name ?",
    "My name is Jenny,Nice to meet you!",
  ];
  const lastMessage = messages[messages.length - 1];
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
        <div className="max-w-full md:min-w-[320px] lg:w-[400px] border border-1  bg-gradient-to-b from-[rgba(230,124,32,0.54)] to-[rgba(208,171,59,0.75)] rounded-[1.75rem] p-6 shadow-[rgba(255,255,255,0.7)]">
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
      <div className="w-full flex justify-center mt-3">
        {CallStatus.IDLE === "IDLE" ? (
          <button className="px-4 py-2 rounded-lg bg-green-700 text-white tracking-wider text-xl">
            {CallStatus.FINISHED === "CONNECTING" ? (
              "Call"
            ) : (
              <div className="flex gap-1 py-3 px-4">
                <div
                  className="w-2 h-2 bg-white rounded-full animate-bounce"
                  style={{ animationDelay: ".5s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-white rounded-full animate-bounce"
                  style={{ animationDelay: ".7s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-white rounded-full animate-bounce"
                  style={{ animationDelay: ".14s" }}
                ></div>
              </div>
            )}
          </button>
        ) : (
          <button className="px-4 py-2 rounded-lg bg-red-700 text-white tracking-wider text-xl">
            End
          </button>
        )}
      </div>
      {messages.length > 0 && (
        <section className="mt-6 w-full md:w-2/5 mx-auto top-side-glow rounded ">
          <p
            className={cn(
              ` p-3 transition-opacity duration-500 opacity-0`,
              `animate-fadeIn opacity-100`,
            )}
          >
            {lastMessage}
          </p>
        </section>
      )}
    </>
  );
};

export default Agent;
