// middleware/auth.ts — Clerk session guard for paid API routes

import { auth } from "@clerk/nextjs/server";
import { AppError } from "@/lib/errors";

interface AuthenticatedSession {
  readonly userId: string;
}

export async function requireAuth(): Promise<AuthenticatedSession> {
  const session = await auth();

  if (!session.userId) {
    throw AppError.authentication(
      "No authenticated session found for protected route",
      {}
    );
  }

  return { userId: session.userId };
}
