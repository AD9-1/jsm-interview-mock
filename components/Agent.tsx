"use client";
import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

enum CallStatus {
  IDLE = "IDLE",
  ACTIVE = "ACTIVE",
  CONNECTING = "CONNECTING",
  FINISHED = "FINISHED",
}

const Agent = ({ userName, userId, type }: AgentProps) => {
  const router = useRouter();
  const [isAgentSpeaking, setIsAgentSpeaking] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.IDLE);
  const [messages, setMessages] = useState<Transcript[]>([]);



  useEffect(() => {
    const callStart = () => setCallStatus(CallStatus.ACTIVE);
    const callEnd = () => setCallStatus(CallStatus.FINISHED);

    const onMessage = (conversation: any) => {
      
      if (conversation.role === "user") {
        setIsUserSpeaking(true);
      } else if (conversation.role === "assistant") {
        setIsUserSpeaking(false);
      }

      if (
        conversation.type === "transcript" &&
        conversation.transcriptType === "final"
      ) {
        const newMessage = {
          role: conversation.role,
          content: conversation.transcript,
        };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const speechStart = () => setIsAgentSpeaking(true);
    const speechEnd = () => setIsAgentSpeaking(false);
    const onError = (error: unknown) => {
      setCallStatus(CallStatus.FINISHED);
      console.error(" error happens in Agent component:", error);
    };
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
      const timeoutId = setTimeout(() => router.push("/interview/id"), 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [type, callStatus, router, userId]);

  const connectedCall = async () => {
    setCallStatus(CallStatus.CONNECTING);
    setTimeout(() => {
      setCallStatus(CallStatus.ACTIVE);
    }, 0);
    try {
      await vapi.start(
        undefined,
        undefined,
        undefined,
        process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID,
        {
          variableValues: {
            username: userName?.split(" ")[0],
            userid: userId,
          },
        },
      );
    } catch (error) {
      setCallStatus(CallStatus.FINISHED);

      console.log(
        "Cannot start the call,there must be importing issue of workflow-id : ",
        error,
      );
    }
  };
  const disconnectedCall = async () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  return (
    <>
      <div className="flex flex-col gap-6 md:flex-row md:justify-center md:items-center">
        <div className="max-w-full  md:min-w-[320px] lg:w-[400px] border border-1  bg-gradient-to-b from-[rgba(191,102,23,0.54)] to-[rgba(219,200,22,0.11)] rounded-[1.75rem] p-6 shadow-[rgba(255,255,255,0.7)]">
          <div
            className={`w-fit mx-auto rounded-full p-1 border-2 border-[#644e2a] ${isAgentSpeaking ? "speaking-ring" : ""}`}
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
            className={`w-fit mx-auto rounded-full p-1 border-2 border-[#644e2a] ${isUserSpeaking ? "speaking-ring" : ""}`}
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
        {callStatus === "IDLE" ? (
          <button
            className="px-4 py-2 rounded-lg bg-green-700 text-white tracking-wider text-xl"
            onClick={connectedCall}
          >
            {callStatus === CallStatus.IDLE|| callStatus === CallStatus.FINISHED ? "Call" : <></>}
          </button>
        ) : (
          <>
            {callStatus === CallStatus.CONNECTING ? (
              <button className="px-4 py-2 rounded-lg bg-green-700">
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
              </button>
            ) : (
              <button
                className="px-4 py-2 rounded-lg bg-red-700 text-white tracking-wider text-xl"
                onClick={disconnectedCall}
              >
                End
              </button>
            )}
          </>
        )}
      </div>
      {messages.length > 0 && (
        <section className="mt-6 w-full md:w-3/4 mx-auto top-side-glow rounded ">
        <div className="max-h-44 overflow-y-auto  p-6">
          {messages.map((m,index)=>{
            return(
            <p key={index} className="mb-1">
              <strong>{m.role==="user" ? "You" : "Pawnee"} : </strong> {m.content}
            </p>
            )
          })}
        </div>

        </section>
      )}
    </>
  );
};

export default Agent;
