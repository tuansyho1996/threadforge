import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getOrCreateUser } from "@/lib/user";
import { createMockupSchema } from "@/lib/validations";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await getOrCreateUser(userId);

  const mockups = await db.mockup.findMany({
    where: { userId: user.id },
    include: { template: true, brand: true },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json({ success: true, data: mockups });
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await getOrCreateUser(userId);

  const body = await req.json();
  const parsed = createMockupSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const mockup = await db.mockup.create({
    data: {
      ...parsed.data,
      canvasJson: parsed.data.canvasJson as Prisma.InputJsonObject,
      userId: user.id,
    },
    include: { template: true },
  });

  return NextResponse.json({ success: true, data: mockup }, { status: 201 });
}
