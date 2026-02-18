"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeClosed } from "lucide-react";
import { AuthFormData, AuthformSchema } from "@/zodutils/authFormSchema";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Form } from "./ui/form";
import { useRouter } from "next/navigation";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/client";
import { signin, signup } from "@/lib/actions/auth.action";
import { useState } from "react";

const AuthForm = ({ type }: { type: "sign-in" | "sign-up" }) => {
  const [showPass, setShowPass] = useState(true);
  const form = useForm<AuthFormData>({
    resolver: zodResolver(AuthformSchema({ type })),
    defaultValues: {
      name: "", //this sets the default value for name field
      email: "",
      password: "",
    },
  });
const router=useRouter();
  const onSubmit = async (data: AuthFormData) => {
    if (type === "sign-up") {
      try {
        const userCred = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password,
        );

        const record = await signup({
          uid: userCred.user.uid,
          email: data.email,
          name: data.name || "",
          password: data.password,
        });
console.log(record);
        if (record.success!==true) {
          toast.error("Failed to create account in database");
          return
        } 
          toast.success("Account created in database.Please sign in");
          router.push("/auth/sign-in");
        
      } catch (error: any) {
        if (error.code === "auth/email-already-in-use") {
          toast.error("Email already in use");
          console.error(error);
        }
        else
        toast.error("Failed to create account in database");
      }
    } else {
      const { email, password } = data;
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
        const idToken = await userCredential.user.getIdToken();
        if (!idToken) {
          toast.error("Failed to sign_in/no token received");
          return;
        }
        const record = await signin({ email, idToken });
        if (record?.success) {
          toast.success("Signed in successfully");
          router.push("/");
        } else {
          toast.error(record.message);
        }
      } catch (error) {
        toast.error("Failed to sign in");
      }
    }
  };
  return (
    <div className="w-md border border-2 rounded-md p-1 lg:w-1/2">
      <div className="bg-gradient-to-l from-gray-400 via-gray-400 to bg-gray-500 p-2 rounded-xl p-4">
        <div className="flex items-center justify-center">
          <Image
            src="/microphone.png"
            height={20}
            width={75}
            alt="Microphone"
          />
          <h1 className="text-xl font-semibold text-center text-gray-900">
            {type === "sign-in" ? " Sign In" : " Sign Up"}
          </h1>
        </div>
        <h3 className="text-lg  md:text-2xl font-medium text-center">
          Practice job interview with AI
        </h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-2"
          >
            {type === "sign-up" && (
              <>
                <p className="mb-2 ml-5">Name</p>
                <input
                  type="text"
                  {...form.register("name")}
                  className="ml-5 mb-2 w-3/4 p-3 rounded-4xl border border-amber-50
                focus:outline-none
                focus:border-0
                focus:ring-2
                focus:ring-[#62608f]"
                />
              </>
            )}
            <p className="mb-2 ml-5">Email</p>
            <input
              type="text"
              {...form.register("email")}
              className="ml-5 mb-2 w-3/4 p-3 rounded-4xl border border-amber-50
              focus:outline-none
                focus:border-0
                focus:ring-2
                focus:ring-[#62608f]"
            />
            <p className="mb-2 ml-5">Password</p>
            {
              <div
                className=" flex justify-between ml-5 mb-5 p-3 w-3/4 rounded-4xl border border-amber-50
              "
              >
                <input
                  type={showPass ? "password" : "text"}
                  className="outline-0 w-full"
                  {...form.register("password")}
                />
                <button type="button" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <EyeClosed /> : <EyeIcon />}
                </button>
              </div>
            }
            <button className="btn" type="submit">
              {type === "sign-up" ? "Sign Up" : "Sign In"}
            </button>
          </form>
        </Form>
        <p className="text-center mt-2 text-gray-800">
          {type === "sign-in"
            ? "Don't have an account?"
            : "Already have an account?"}
          <span>
            <Link
              href={type === "sign-in" ? "/auth/sign-up" : "/auth/sign-in"}
              className=" font-semibold"
            >
              {type === "sign-in" ? " Sign Up" : " Sign In"}
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
