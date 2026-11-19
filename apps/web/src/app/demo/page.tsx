"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import type { Canvas } from "fabric";
import { ArrowLeft, Download } from "lucide-react";
import { MockupCanvas } from "@/components/editor/canvas";
import { EditorToolbar } from "@/components/editor/toolbar";
import { Button } from "@/components/ui/button";
import type { Template } from "@/types";

const demoTemplate: Template = {
  id: "threadforge-demo-tee",
  name: "Classic Tee — Demo",
  slug: "classic-tee-demo",
  category: "TSHIRT",
  subcategory: "T-shirt",
  imageUrl: "/demo/tshirt.svg",
  maskUrl: "/demo/tshirt.svg",
  thumbUrl: "/demo/tshirt.svg",
  width: 800,
  height: 800,
  designArea: { x: 280, y: 240, width: 240, height: 260, rotation: 0 },
  tags: ["demo", "t-shirt"],
  isPremium: false,
  isActive: true,
  sortOrder: 0,
  createdAt: new Date("2024-01-01T00:00:00.000Z"),
};

export default function DemoPage() {
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const handleCanvasReady = useCallback((readyCanvas: Canvas) => {
    setCanvas(readyCanvas);
  }, []);

  const exportMockup = useCallback(() => {
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "threadforge-mockup.png";
    link.href = canvas.toDataURL({ format: "png", multiplier: 1 });
    link.click();
  }, [canvas]);

  return (
    <main className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="text-sm font-semibold">ThreadForge</Link>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back home
            </Link>
          </Button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl space-y-6 px-4 py-10">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Interactive preview</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">Make a T-shirt mockup</h1>
          <p className="mt-2 text-muted-foreground">
            Add text or upload your own image, drag it onto the shirt, then export a PNG.
            This demo works without an account or database.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-3">
            <EditorToolbar canvas={canvas} onExport={exportMockup} />
            <MockupCanvas template={demoTemplate} onCanvasReady={handleCanvasReady} />
          </div>

          <aside className="h-fit space-y-3 rounded-xl border bg-background p-5">
            <h2 className="font-semibold">Quick start</h2>
            <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
              <li>Choose the text icon to add a caption.</li>
              <li>Choose the image icon to upload a logo or design.</li>
              <li>Drag, resize, and rotate your design on the shirt.</li>
              <li>Select an item to move it forward, backward, or delete it.</li>
              <li>Export your finished mockup as a PNG.</li>
            </ol>
            <Button className="w-full" onClick={exportMockup} disabled={!canvas}>
              <Download className="mr-2 h-4 w-4" />
              Export PNG
            </Button>
            <p className="text-xs text-muted-foreground">
              Your work stays in this browser session; the demo does not save designs.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
