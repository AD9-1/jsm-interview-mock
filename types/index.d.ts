interface Interview {
  id: string;
  role: string;
  level: string;
  amount: number;
  questions: string[];
  techstack: string[];
  createdAt: string;
  userId: string;
  type: string;
  finalized: boolean;
   coverImage: string;
}

interface InterviewCardProps {
  id: string;
  role: string;
  userId: string;
  techstack: string[];
  type: string;
  createdAt: string;
  coverImage: string;
}
interface GetLatestInterviewsParams {
  userId: string;
  limit?: number;
}
interface SignInParams {
  email: string;
  idToken: string;
}
interface SignUpParams {
  uid: string;
  email: string;
  name: string;
  password: string;
}
interface Feedback {
  id: string;
  interviewId: string;
  totalScore: number;
  categoryScores: Array<{
    name: string;
    score: number;
    comment: string;
  }>;
  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;
  createdAt: string;
}
interface AgentProps {
  userName?: string;
  userId?: string;
  type: "generate" | "mock";
}
interface Transcript {
role: string;
content: string;
}
interface Message {
  type: string;
  transcriptType: string;
  role: string;
  transcript: string;
}