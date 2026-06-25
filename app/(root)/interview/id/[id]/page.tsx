
import { getInterviewById } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";


const Page = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  console.log("interviewId", id);

  const interview = await getInterviewById(id);

  if (!interview) redirect("/");

  return <div>
    <section className="flex gap-4 justify-between"></section>

  </div>;
};

export default Page;
