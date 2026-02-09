"use server";

import { db } from "@/firebase/admin";

export async function signup(params: SignUpParams) {
  const { uid, name, email } = params;
  try {
    const userRecord=await db.collection("users").doc(uid).get();
    if(userRecord.exists){
      return{
        success:false,
        message:"User already exists,please sign in again"
      }
    }
    await db.collection("users").doc(uid).set({
      name,
      email,});

  } catch (error:any) {
    console.error("Failed to sign up user");
    if(error.code === "auth/email-already-in-use") {
      return{
        success:false,
        message:"Email already in use"
      }
    }
    return{
      success: false,
      message:"Failed to create user account"
    }
  }
}
