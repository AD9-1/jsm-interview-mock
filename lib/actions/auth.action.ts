"use server";

import { db, auth } from "@/firebase/admin";
import { User } from "firebase/auth";
import { cookies } from "next/headers";

export async function signup(params: SignUpParams) {
  const { uid, name, email, password } = params;
  try {
    await db.collection("users").doc(uid).set({
      name,
      email,
      password,
    });
    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Database error",
    };
  }
}
export async function signin(params: SignInParams) {
  try {
    const userRecord = await auth.getUserByEmail(params.email);

    await setSessionCookies(params.idToken);
    return {
      success: true,
      message: "User signed in successfully",
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
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = cookies(); 
  const sessionCookie = (await cookieStore).get("session")?.value;

  if (!sessionCookie) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(
      sessionCookie,
      true
    );

    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();

    if (!userRecord.exists) return null;

    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;

  } catch (err) {
    console.log(err);
    return null;
  }
}
export async function isAuthenticated(){
  const user=await getCurrentUser();
  return !!user;
}