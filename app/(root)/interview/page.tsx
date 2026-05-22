import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { User } from "firebase/auth";

const Page = async () => {
  const record: AppUser | null = await getCurrentUser();
  console.log("from page.tsx", record);
  return (
    <div>
      <Agent name={record?.name} />
    </div>
  );
};

export default Page;
