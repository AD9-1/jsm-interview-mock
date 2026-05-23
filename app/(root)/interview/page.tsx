import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";


const Page = async () => {
const user=await getCurrentUser();

  return (
    <div>
      <h3>Interview Generation</h3>
      <Agent userName={user?.name} userId={user?.uid } type="generate"/>
    </div>
  );
};

export default Page;
