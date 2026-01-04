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
interface InterviewCardProps{
id:string,
role:string,
userId:string,
techstack:string[],
type:string,
createdAt:string
}