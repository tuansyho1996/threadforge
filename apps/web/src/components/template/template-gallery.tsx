"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Template } from "@/types";

type TemplateCategory = Template["category"];

const CATEGORIES: { label: string; value: TemplateCategory | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "T-Shirts", value: "TSHIRT" },
  { label: "Hoodies", value: "HOODIE" },
  { label: "Sweatshirts", value: "SWEATSHIRT" },
  { label: "Hats", value: "HAT" },
  { label: "Joggers", value: "JOGGERS" },
  { label: "Accessories", value: "ACCESSORIES" },
];

interface TemplateGalleryProps {
  templates: Template[];
  selected?: string;
  onSelect: (template: Template) => void;
}

export function TemplateGallery({ templates, selected, onSelect }: TemplateGalleryProps) {
  const [category, setCategory] = useState<TemplateCategory | "ALL">("ALL");

  const filtered =
    category === "ALL" ? templates : templates.filter((t) => t.category === category);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c.value}
            onClick={() => setCategory(c.value)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
              category === c.value
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template)}
            className={cn(
              "group relative overflow-hidden rounded-lg border-2 transition-all",
              selected === template.id
                ? "border-primary shadow-md"
                : "border-transparent hover:border-primary/40"
            )}
          >
            <Image
              src={template.thumbUrl}
              alt={template.name}
              width={200}
              height={200}
              className="aspect-square w-full object-cover"
            />
            {template.isPremium && (
              <span className="absolute right-1 top-1 rounded bg-amber-400 px-1 text-[9px] font-bold text-amber-900">
                PRO
              </span>
            )}
            <p className="truncate bg-background/90 p-1 text-center text-xs">{template.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
