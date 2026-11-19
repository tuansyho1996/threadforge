import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function getOrCreateUser(clerkId: string) {
  const clerkUser = await currentUser();
  if (!clerkUser || clerkUser.id !== clerkId) {
    throw new Error("Unable to load the authenticated Clerk user.");
  }

  const email = clerkUser.primaryEmailAddress?.emailAddress;
  if (!email) {
    throw new Error(`Clerk user ${clerkId} does not have a primary email address.`);
  }

  const name = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || null;

  return db.user.upsert({
    where: { clerkId },
    create: {
      clerkId,
      email,
      name,
      avatarUrl: clerkUser.imageUrl,
    },
    update: {
      email,
      name,
      avatarUrl: clerkUser.imageUrl,
    },
  });
}
