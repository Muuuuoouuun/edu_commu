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
    const isDark = variant === "dark";

    return (
        <div className={cn(
            "group relative overflow-hidden rounded-3xl transition-all duration-300",
            isHero ? "bg-white flex flex-col md:flex-row h-full" : "",
            variant === "light" ? "bg-white border-slate-200" : "",
            isDark ? "bg-primary-DEFAULT text-white border-transparent" : "",
            "hover:shadow-xl hover:-translate-y-1 border",
            isHero ? "bg-white border-slate-200" : "", // Hero also needs border
            className
        )}>
            {/* Image Section */}
            {(isHero || (image && variant !== "dark")) && (
                <div className={cn(
                    "relative overflow-hidden",
                    isHero ? "w-full md:w-1/2 min-h-[300px] md:min-h-full p-4" : "h-48 w-full"
                )}>
                    {isHero ? (
                        <div className="relative w-full h-full rounded-2xl overflow-hidden">
                            <Image
                                src={image || ""}
                                alt={title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                    ) : (
                        image && (
                            <Image
                                src={image}
                                alt={title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        )
                    )}
                </div>
            )}

            {/* Content Section */}
            <div className={cn(
                "flex flex-col justify-between p-6 md:p-8 relative",
                isHero ? "w-full md:w-1/2" : "h-full"
            )}>
                <div>
                    <div className="flex items-center justify-between mb-6 text-xs font-bold tracking-widest uppercase opacity-70">
                        <div className="flex items-center gap-2">
                            <span className={cn("w-2 h-2 rounded-full", isDark ? "bg-accent-gold" : "bg-primary-soft")} />
                            {category}
                        </div>
                        <span>{date}</span>
                    </div>

                    <h3 className={cn(
                        "font-bold mb-4 leading-tight group-hover:text-accent-gold transition-colors",
                        isHero ? "text-3xl md:text-4xl font-serif" : "text-xl",
                        isDark ? "text-white" : "text-slate-900"
                    )}>
                        {title}
                    </h3>

                    {(isHero || variant === "dark") && excerpt && (
                        <p className={cn(
                            "text-sm leading-relaxed mb-6 line-clamp-3",
                            isDark ? "text-slate-300" : "text-slate-600"
                        )}>
                            {excerpt}
                        </p>
                    )}
                </div>

                <div className="flex items-end justify-between mt-auto pt-6">
                    <span className={cn(
                        "text-xs font-bold uppercase tracking-wider border-b pb-1",
                        isDark ? "border-white/30 text-white/80" : "border-slate-300 text-slate-500"
                    )}>
                        Read Article
                    </span>

                    {/* Floating Action Button */}
                    <div className={cn(
                        "absolute bottom-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                        "bg-accent-gold text-primary-DEFAULT group-hover:bg-accent-cyan group-hover:scale-110 shadow-lg"
                    )}>
                        <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                    </div>
                </div>
            </div>
        </div>
    );
}
