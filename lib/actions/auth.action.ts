"use server";

import { db, auth } from "@/firebase/admin";
import { User } from "firebase/auth";
import { cookies } from "next/headers";

export async function signup(params: SignUpParams) {
  const { uid, name, email, password } = params;

  try {
    const userRecord = await db.collection("users").doc(uid).get();
    if (userRecord.exists) {
      return {
        success: false,
        message: "User  already exists.Please sign-in instead",
      };
    }
    await db.collection("users").doc(uid).set({
      name,
      email,
      password,
    });
    return {
      success: true,
    };
  } catch (error: any) {
    console.error(error);
    if (error.code === "auth/email-already-in-use") {
      return {
        success: false,
        message: "Email already in use",
      };
    }
    return {
      success: false,
      message: "Failed to create user in database",
    };
  }
}
export async function signin(params: SignInParams) {
  try {
    const userRecord = await auth.getUserByEmail(params.email);
    if (userRecord == null) {
      return {
        success: false,
        message: "User does not exist. Please sign up first",
      };
    }

    await setSessionCookies(params.idToken);
    return {
      success: true,
      message: "you signed in successfully",
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
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();

    if (!userRecord.exists) return null;

    return {
      ...userRecord.data(),
      uid: decodedClaims.uid,
    } as User;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getInterviewQuestionsbyUserId(
  userId: string,
): Promise<Interview[]> {
  const interviewsSnapshot = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .get();

  const interviews: Interview[] = interviewsSnapshot.docs.map((doc) => {
    return { id: doc.id, ...(doc.data() as Omit<Interview, "id">) };
  });
  return interviews;
}
export async function getLatestInterviews(
  params: GetLatestInterviewsParams,
): Promise<Interview[] | []> {
  const { userId, limit = 20 } = params;
  const interviewsDoc = await db
    .collection("interviews")
    .where("userId", "!=", userId)
    .where("finalized", "==", true)
    .limit(limit)
    .orderBy("createdAt", "desc")
    .get();
  const interviews: Interview[] = interviewsDoc.docs.map((doc) => ({
    id: doc.id as string,
    ...(doc.data() as Omit<Interview, "id">),
  }));
  return interviews;
}
