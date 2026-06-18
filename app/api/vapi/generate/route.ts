import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { getRandomInterviewCoverImage } from "@/lib/utils";
import { db } from "@/firebase/client";
import { addDoc, collection } from "firebase/firestore";

export async function GET() {
  return Response.json({ success: true, data: "Thank You!" }, { status: 200 });
}
export async function POST(request: Request) {
  console.log("POST /api/vapi/generate called");

  try {
    const body = await request.json();
    const response = await generateText({
      model: google("gemini-2.5-flash-lite"),
      prompt: `Prepare questions for a job interview.
The job role is ${body.role}.
The techstack used in this job is ${body.techstack}.
The focus between behavioural and technical questions is ${body.type}.
The amount of questions required: ${body.amount}.
The job experience level is ${body.level}.
Return the question format like this:[Question1,question2,question3,...]
Please return only the array of questions without any additional text or formatting.
The questions are to be read by voice assistant, so please don't include any numbering or bullet points or "/" or "*" in the response.
Just return the questions as plain text separated by commas.
Thank you in advance!`,
    });
    const questions = response.text.trim();

    const interview = {
      questions: questions.split(",").map((q: string) => q.trim()),
      role: body.role,
      techstack: body.techstack,
      type: body.type ?? "mixed",
      level: body.level ?? "mid-senior",
      userId: body.userid,
      finalized: true,
      coverImage: getRandomInterviewCoverImage(),
      createdAt: new Date().toISOString(),
    };

    console.log("Generated interview:", interview);
    // await db.collection("interviews").add(interview);
    const docRef = await addDoc(collection(db, "interviews"), interview);
    return Response.json(
      { success: true, data: interview, InterviewId: docRef.id },
      { status: 200 },
    );
  } catch (error) {
    console.log("Error in generating interview questions:", error);
    return Response.json(
      { success: false, error: "Failed to generate interview questions" },
      { status: 500 },
    );
  }
}
