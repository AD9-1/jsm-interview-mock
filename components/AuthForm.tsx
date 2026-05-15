"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import FormField from "./FormField";

const getFirebaseErrorMessage = (error: unknown, fallback: string) => {
  if (typeof error === "object" && error && "code" in error) {
    const code = String(error.code);

    if (code === "auth/email-already-in-use") return "Email already in use";
  }

  return fallback;
};

const AuthForm = ({ type }: { type: "sign-in" | "sign-up" }) => {
  const form = useForm<AuthFormData>({
    resolver: zodResolver(AuthformSchema({ type })),
    defaultValues: {
      name: "", //this sets the default value for name field
      email: "",
      password: "",
    },
  });
  const router = useRouter();
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
        if (record?.success !== true) {
          toast.error(record?.message||"Failed to create account in database");
          return;
        }
        toast.success("Account created in database.Please sign in");
        router.push("/auth/sign-in");
      } catch (error: unknown) {
        toast.error(
          getFirebaseErrorMessage(error, "Failed to create account in database"),
        );
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
        console.log(idToken);
        const record = await signin({ email, idToken });
        if (record?.success) {
          toast.success(record.message);
          router.push("/");
        } else {
          toast.error(record.message);
        }
      } catch {
        toast.error("Failed to sign-in");
      }
    }
  };

  const isSignIn = type === "sign-in";
  return (
    <div className="panel w-full max-w-xl overflow-hidden p-2">
      <div className="rounded-[1.75rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,250,245,0.96),rgba(247,229,209,0.95))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] sm:p-8">
        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="rounded-2xl bg-white/80 p-3 shadow-sm">
            <Image
              src="/microphone.png"
              height={20}
              width={42}
              alt="Microphone"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary/60">
              MockWise
            </p>
            <h1 className="font-[family-name:var(--font-montagu-slab)] text-3xl font-semibold text-gray-900">
              {isSignIn ? "Sign In" : "Sign Up"}
            </h1>
          </div>
        </div>
        <div className="mb-8 text-center">
          <h3 className="text-lg font-medium text-foreground/80 sm:text-xl">
            Practice job interviews with AI
          </h3>
          <p className="mt-2 text-sm leading-6 text-foreground/60">
            Access guided mock sessions, sharpen your answers, and keep your prep in one place.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
          >
            {type === "sign-up" && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your name"
              />
            )}
            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email"
              type="email"
            />
            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Your password"
              type="password"
            />
            <button className="btn mt-2" type="submit">
              {isSignIn ? "Sign In" : "Create Account"}
            </button>
          </form>
        </Form>

        <p className="mt-6 text-center text-sm text-foreground/70">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}
          <span className="ml-2">
            <Link
              href={isSignIn ? "/auth/sign-up" : "/auth/sign-in"}
              className="font-semibold text-primary transition hover:text-primary/80"
            >
              {isSignIn ? "Sign Up" : "Sign In"}
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
