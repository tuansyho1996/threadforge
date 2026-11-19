import Link from "next/link";
import { ArrowRight, Layers, Palette, Package, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2 font-semibold">
            <Layers className="h-5 w-5" />
            ThreadForge
          </div>
          <nav className="hidden gap-6 text-sm text-muted-foreground sm:flex">
            <Link href="/demo" className="hover:text-foreground">Try demo</Link>
            <Link href="/pricing" className="hover:text-foreground">Pricing</Link>
            <Link href="/about" className="hover:text-foreground">About</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/sign-up">Get started free</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-24 text-center">
        <p className="rounded-full border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
          Built for clothing brands
        </p>
        <h1 className="max-w-3xl text-5xl font-bold tracking-tight">
          Mockups that make your brand look{" "}
          <span className="text-primary">incredible</span>
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Place your designs on photorealistic garment templates, manage your brand kit, organize
          collections, and export in seconds — no Photoshop needed.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button size="lg" asChild>
            <Link href="/sign-up">
              Start for free <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/demo">Try the demo</Link>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-muted/30 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Everything your brand needs</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Layers,
                title: "100+ Templates",
                desc: "Tees, hoodies, hats, joggers, and more — new templates added weekly.",
              },
              {
                icon: Palette,
                title: "Brand Kit",
                desc: "Store logos, colors, and fonts per brand. Switch in one click.",
              },
              {
                icon: Package,
                title: "Collections",
                desc: "Group mockups into seasonal drops or lookbooks to share with buyers.",
              },
              {
                icon: Download,
                title: "Pro Exports",
                desc: "Export PNG, WebP, or PDF at any resolution — print or digital ready.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl border bg-card p-6 shadow-sm">
                <Icon className="mb-3 h-8 w-8 text-primary" />
                <h3 className="mb-1 font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} ThreadForge. All rights reserved.
      </footer>
    </div>
  );
}
