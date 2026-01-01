"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";

import { AuthFormData, formSchema } from "@/zodutils/authFormSchema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";

const AuthForm = ({type}: { type: "login" | "signup" }) => {
  const form = useForm<AuthFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "", //this sets the default value for username field
    },
  });

  const onSubmit = (data: AuthFormData) => {
    console.log("Form Data Submitted: ", data);
  };
  return (
    <div className="w-md border border-2 rounded-md p-1 lg:w-1/2">
      <div className="bg-gradient-to-l from-gray-400 via-gray-400 to bg-gray-500 p-2 rounded-xl p-4">
        <div className="flex items-center justify-center">
        <Image src="/microphone.png" height={20} width={75} alt="Microphone" />
        <h1 className="text-xl font-semibold text-center text-gray-900">Sign Up</h1>
        </div>
        <h3 className="text-lg  md:text-2xl font-medium text-center">Practice job interview with AI</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-2">
          
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
    </div>
  );
};

export default AuthForm;
