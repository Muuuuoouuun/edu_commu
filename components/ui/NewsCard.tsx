"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsCardProps {
    id: string | number;
    title: string;
    excerpt?: string;
    category: string;
    date: string;
    image?: string;
    variant?: "hero" | "light" | "dark";
    className?: string;
}

export function NewsCard({
    title,
    excerpt,
    category,
    date,
    image,
    variant = "light",
    className
}: NewsCardProps) {
    const isHero = variant === "hero";

    // Anthropic Style: Clean, bordered cards. Hero is just larger.
    // No "Dark" variant usage for now to keep consistency, or map it to dark text on light bg.

    return (
        <div className={cn(
            "group flex flex-col border-t border-border pt-6 transition-colors hover:border-black/50",
            isHero ? "md:grid md:grid-cols-2 md:gap-8 md:border-none" : "h-full justify-between",
            className
        )}>
            {/* Image (Optional for standard, required for hero usually but we will handle gracefully) */}
            {image && (
                <div className={cn(
                    "relative overflow-hidden bg-muted mb-6",
                    isHero ? "aspect-[16/9] md:aspect-auto md:h-full rounded-none" : "aspect-[3/2] w-full mb-4"
                )}>
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>
            )}

            {/* Content */}
            <div className={cn(
                "flex flex-col",
                isHero ? "justify-center" : "flex-1"
            )}>
                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-muted mb-3">
                    <span className="text-accent-gold">{category}</span>
                    <span>•</span>
                    <span>{date}</span>
                </div>

                <h3 className={cn(
                    "font-serif font-medium leading-tight mb-3 group-hover:text-black/70 transition-colors",
                    isHero ? "text-4xl md:text-5xl" : "text-xl"
                )}>
                    {title}
                </h3>

                {excerpt && (
                    <p className="text-base leading-relaxed text-muted mb-6">
                        {excerpt}
                    </p>
                )}

                <div className="mt-auto pt-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground group-hover:underline">
                    Read Article
                    <ArrowRight className="w-4 h-4" />
                </div>
            </div>
        </div>
    );
}
