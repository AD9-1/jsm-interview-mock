"use server";

import { db, auth } from "@/firebase/admin";

import { cookies } from "next/headers";

export async function signup(params: SignUpParams) {
  const { uid, name, email,password } = params;
  try {
    const userRecord = await db.collection("users").doc(uid).get();
    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exists,please sign in again",
      };
    }
    await db.collection("users").doc(uid).set({
      name,
      email,
      password
    });
  } catch (error: any) {
    console.error("Failed to sign up user");
    if (error.code === "auth/email-already-in-use") {
      return {
        success: false,
        message: "Email already in use",
      };
    }
    return {
      success: false,
      message: "Failed to create user account",
    };
  }
}
export async function signin(params: SignInParams) {
  try {
    const userRecord = await auth.getUserByEmail(params.email);
    if (userRecord) {
      await setSessionCookies(params.idToken);
      return {
        success: true,
        message: "User signed in successfully",
      };
    }
    return {
      success: false,
      message: "User does not exist,please create an account",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Failed to sign in user",
    };
  }
}
export async function setSessionCookies(idToken: string) {
  const seven_days = 60 * 60 * 24 * 7 * 1000;
  const cookieOptions = await cookies();
  const sessionCookies = await auth.createSessionCookie(idToken, {
    expiresIn: seven_days, //7 days
  });
  cookieOptions.set("session", sessionCookies, {
    maxAge: seven_days / 1000,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });
}
