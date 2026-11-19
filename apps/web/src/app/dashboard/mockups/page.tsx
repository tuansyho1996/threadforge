import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";
import { db } from "@/lib/db";
import { getOrCreateUser } from "@/lib/user";
import { MockupCard } from "@/components/mockup/mockup-card";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Mockups",
  description: "Manage your ThreadForge garment mockups.",
};

export default async function MockupsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await getOrCreateUser(userId);
  const mockups = await db.mockup.findMany({
    where: { userId: user.id },
    include: { template: true },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Mockups</h1>
          <p className="text-sm text-muted-foreground">
            {mockups.length} mockup{mockups.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/editor/new">
            <Plus className="mr-2 h-4 w-4" />
            New Mockup
          </Link>
        </Button>
      </div>

      {mockups.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-20 text-center">
          <p className="text-lg font-medium">No mockups yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Create your first mockup to get started.
          </p>
          <Button className="mt-4" asChild>
            <Link href="/dashboard/editor/new">
              <Plus className="mr-2 h-4 w-4" />
              New Mockup
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {mockups.map((mockup) => (
            <MockupCard key={mockup.id} mockup={mockup} />
          ))}
        </div>
      )}
    </div>
  );
}
