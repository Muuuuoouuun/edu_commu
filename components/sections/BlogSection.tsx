"use client";

import { NewsCard } from "@/components/ui/NewsCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

// Mock Data updated to match the new "Newsroom" feel
const NEWS_ITEMS = [
    {
        id: 1,
        title: "Optogenetics-enabled discovery of integrated stress response modulators",
        excerpt: "In this landmark Cell publication, we unveil our first-of-a-kind optogenetic screening platform, which unlocks a novel mode of drug discovery.",
        category: "Publications",
        date: "September 4, 2025",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2600&auto=format&fit=crop", // Scientific/Abstract image
        variant: "hero" as const,
    },
    {
        id: 2,
        title: "Scaling Computer Vision to Solve Aging",
        excerpt: "How computer vision is revolutionizing the way we understand biological aging processes.",
        category: "News",
        date: "December 18, 2025",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2600&auto=format&fit=crop",
        variant: "light" as const,
    },
    {
        id: 3,
        title: "Aging as an Engineering Problem",
        excerpt: "Reframing biological decay as a solvable engineering challenge rather than an inevitability.",
        category: "News",
        date: "December 2, 2025",
        variant: "dark" as const,
    },
    {
        id: 4,
        title: "Inside Our Science: Nobel Laureate Sir David MacMillan on Collaboration",
        excerpt: "A deep dive into cross-disciplinary research strategies with one of the world's leading chemists.",
        category: "News",
        date: "November 21, 2025",
        variant: "dark" as const,
    },
];

export function BlogSection() {
    return (
        <section className="py-20 container mx-auto px-4 md:px-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-t border-black pt-8">
                <h2 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-foreground">
                    최신 소식
                </h2>

                <div className="flex items-center gap-4">
                    <Link href="/blog" className="text-sm font-bold uppercase tracking-widest hover:underline flex items-center gap-2">
                        전체 보기
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            {/* Grid Layout */}
            <div className="space-y-6">
                {/* Hero Row */}
                <div className="w-full">
                    <NewsCard {...NEWS_ITEMS[0]} className="w-full shadow-sm hover:shadow-md" />
                </div>

                {/* Bottom Row (3 Columns) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {NEWS_ITEMS.slice(1).map((item) => (
                        <NewsCard key={item.id} {...item} className="h-full min-h-[320px] shadow-sm hover:shadow-md" />
                    ))}
                </div>
            </div>
        </section>
    );
}

