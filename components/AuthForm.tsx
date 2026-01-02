"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";

import { AuthFormData, AuthformSchema } from "@/zodutils/authFormSchema";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Form } from "./ui/form";
import router from "next/router";

const AuthForm = ({ type }: { type: "sign-in" | "sign-up" }) => {
  const form = useForm<AuthFormData>({
    resolver: zodResolver(AuthformSchema({ type })),
    defaultValues: {
      name: "", //this sets the default value for name field
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: AuthFormData) => {
    try {
      if (type === "sign-up") {
        toast.success("Account created successfully.Please sign in");
        router.push("/sign-in");
      }
    } catch (err) {
      console.error("Error submitting form: ", err);
      toast.error("An error occurred while submitting the form.");
      router.push("/");
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
            {type === "sign-up" && <p className="mb-2 ml-5">Name</p>}
            <p className="mb-2 ml-5">Email</p>
            <p className="mb-2 ml-5">Password</p>

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
