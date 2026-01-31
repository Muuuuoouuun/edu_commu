"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface BlogCardProps {
    title: string;
    excerpt: string;
    category: string;
    author: string;
    date: string;
    image: string;
    href?: string;
    featured?: boolean;
}

export function BlogCard({
    title,
    excerpt,
    category,
    author,
    date,
    image,
    href = "#",
    featured = false,
}: BlogCardProps) {
    return (
        <Link
            href={href}
            className={cn(
                "group flex flex-col gap-4 overflow-hidden",
                featured ? "md:grid md:grid-cols-2 md:gap-12 items-center" : ""
            )}
        >
            <div className={cn(
                "relative overflow-hidden rounded-2xl bg-slate-100",
                featured ? "aspect-[16/9] md:aspect-[4/3] w-full" : "aspect-[3/2] w-full"
            )}>
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />
            </div>

            <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 text-xs font-semibold tracking-wider text-accent-rose uppercase mb-3">
                    <span>{category}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span className="text-slate-500">{date}</span>
                </div>

                <h3 className={cn(
                    "font-bold text-primary-DEFAULT leading-tight mb-3 group-hover:text-primary-soft transition-colors",
                    featured ? "text-3xl md:text-4xl" : "text-xl"
                )}>
                    {title}
                </h3>

                <p className={cn(
                    "text-text-muted leading-relaxed mb-4 line-clamp-3",
                    featured ? "text-lg" : "text-sm"
                )}>
                    {excerpt}
                </p>

                <div className="flex items-center gap-3 text-sm">
                    <span className="font-medium text-slate-900 border-b border-transparent group-hover:border-slate-900 transition-all">Read Article</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
            </div>
        </Link>
    );
}
