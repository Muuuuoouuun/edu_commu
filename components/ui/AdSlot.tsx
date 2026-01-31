"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdSlotProps {
    variant?: "native" | "banner" | "sidebar";
    title: string;
    description: string;
    cta?: string;
    image?: string;
    sponsor?: string;
    className?: string;
}

export function AdSlot({
    variant = "native",
    title,
    description,
    cta = "Learn more",
    image,
    sponsor = "Sponsored",
    className,
}: AdSlotProps) {
    if (variant === "banner") {
        return (
            <div className={cn("relative overflow-hidden rounded-2xl bg-surface border border-accent-gold/20 p-6 md:p-8 my-8 group", className)}>
                <div className="absolute top-0 right-0 bg-accent-gold/10 text-accent-gold text-[10px] font-bold px-2 py-1 rounded-bl-lg uppercase tracking-wider">
                    {sponsor}
                </div>
                <div className="flex flex-col md:flex-row items-center gap-6 z-10 relative">
                    {image && (
                        <div className="relative w-full md:w-1/3 h-48 rounded-xl overflow-hidden bg-slate-200">
                            <Image src={image} alt={title} fill className="object-cover" />
                        </div>
                    )}
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-xl md:text-2xl font-bold text-primary-DEFAULT mb-2 text-balance">{title}</h3>
                        <p className="text-text-muted mb-6 leading-relaxed text-balance">{description}</p>
                        <button className="inline-flex items-center gap-2 bg-primary-DEFAULT text-white px-6 py-3 rounded-full font-medium hover:bg-primary-soft transition-all transform hover:-translate-y-0.5 shadow-lg shadow-primary-DEFAULT/20">
                            {cta} <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Native List Style
    return (
        <div className={cn("group relative flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-[#F9FAFB] border border-slate-100 hover:border-accent-gold/30 transition-all", className)}>
            <div className="absolute top-4 right-4 text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                {sponsor}
            </div>
            {image && (
                <div className="relative w-full md:w-48 h-32 md:h-auto rounded-xl bg-slate-200 overflow-hidden shrink-0">
                    <Image src={image} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
            )}
            <div className="flex flex-col justify-center flex-1">
                <h4 className="text-lg font-bold text-slate-900 group-hover:text-primary-soft transition-colors mb-2">
                    {title}
                </h4>
                <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                    {description}
                </p>
                <div className="flex items-center text-sm font-medium text-accent-rose group-hover:text-accent-rose/80 transition-colors">
                    {cta} <ArrowUpRight className="w-3 h-3 ml-1" />
                </div>
            </div>
        </div>
    );
}
