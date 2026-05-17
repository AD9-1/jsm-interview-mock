import Agent from "@/components/Agent"
import { getCurrentUser } from "@/lib/actions/auth.action";

const Page = async() => {
  const userRecord=await getCurrentUser();
console.log("User Record:", userRecord);
  return (
    <div>
   <Agent name={userRecord?.name}/>
    </div>
  )
}

export default Page
