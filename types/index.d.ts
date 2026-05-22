interface Interview {
  id: string;
  role: string;
  level: string;
  questions: string[];
  techstack: string[];
  createdAt: string;
  userId: string;
  type: string;
  finalized: boolean;
}
 interface AppUser {
  uid: string;
  name: string;
  email: string;
}

interface InterviewCardProps {
  id: string;
  role: string;
  userId: string;
  techstack: string[];
  type: string;
  createdAt: string;
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
