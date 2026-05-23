"use client";
import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

enum CallStatus {
  IDLE = "IDLE",
  ACTIVE = "ACTIVE",
  CONNECTING = "CONNECTING",
  FINISHED = "FINISHED",
}
const Agent = ({ userName, userId, type }: AgentProps) => {
  const router = useRouter();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.IDLE);
  const [messages, setMessages] = useState<Transcript[]>([]);
  const lastMessage = messages[messages.length - 1];

  useEffect(() => {
    const callStart = () => setCallStatus(CallStatus.ACTIVE);
    const callEnd = () => setCallStatus(CallStatus.FINISHED);
    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };
    const speechStart = () => setIsSpeaking(true);
    const speechEnd = () => setIsSpeaking(false);
    const onError = (error: any) =>
      console.error(" error happens in Agent component:", error);
    vapi.on("call-start", callStart);
    vapi.on("call-end", callEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", speechStart);
    vapi.on("speech-end", speechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", callStart);
      vapi.off("call-end", callEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", speechStart);
      vapi.off("speech-end", speechEnd);
      vapi.off("error", onError);
    };
  }, []);
  useEffect(() => {
    if (callStatus === CallStatus.FINISHED) {
      setTimeout(() => router.push("/interview/id"), 3000);
    }
    //  if (callStatus === CallStatus.FINISHED) {
    //   setTimeout(() => router.push("/"), 3000);
    // }
    const connectedCall = async () => {
      setCallStatus(CallStatus.CONNECTING);
      try {
        await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID);
      } catch (error) {
        console.log(
          "Cannot start the call,there must be importing issue of workflow-id : ",
          error,
        );
        setCallStatus(CallStatus.IDLE);
      }
    };
  }, [type, callStatus, userId]);
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
            {userName || "You"}
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
