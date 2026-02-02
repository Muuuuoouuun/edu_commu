"use client";

import { Heart, MessageCircle, Share2, MoreHorizontal, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CommunityCardProps {
    type: "question" | "review";
    author: {
        name: string;
        avatar?: string;
        badge?: string;
    };
    content: {
        title?: string;
        text: string;
        image?: string;
        rating?: number; // Only for review
    };
    stats: {
        likes: number;
        comments: number;
        time: string;
    };
}

export function CommunityCard({ id, type, author, content, stats }: CommunityCardProps & { id?: string }) {
    const CardContent = (
        <div className="bg-background border-t border-border pt-8 pb-4 transition-colors hover:bg-muted/5 group cursor-pointer">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full bg-muted overflow-hidden">
                        {author.avatar ? (
                            <Image src={author.avatar} alt={author.name} fill className="object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-primary text-foreground font-serif text-xs italic">
                                {author.name[0]}
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-foreground">{author.name}</span>
                            {author.badge && (
                                <span className="text-[10px] items-center px-1.5 py-0.5 border border-border text-muted font-medium uppercase tracking-widest">
                                    {author.badge}
                                </span>
                            )}
                        </div>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-muted/60">{stats.time}</p>
                    </div>
                </div>
                <button className="text-muted hover:text-foreground">
                    <MoreHorizontal className="w-4 h-4" />
                </button>
            </div>

            {/* Content */}
            <div className="mb-6">
                {type === "review" && content.rating && (
                    <div className="flex items-center gap-1 mb-3 text-accent-gold">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={cn("w-3 h-3 fill-current", i < content.rating! ? "" : "text-border fill-transparent")} />
                        ))}
                    </div>
                )}

                {content.title && <h4 className="font-serif text-xl font-medium mb-2 text-foreground group-hover:text-primary transition-colors">{content.title}</h4>}

                <p className="text-foreground text-base leading-relaxed whitespace-pre-line mb-4 font-sans line-clamp-3">
                    {content.text}
                </p>

                {content.image && (
                    <div className="relative w-full h-[300px] overflow-hidden bg-muted mb-4">
                        <Image src={content.image} alt="Post content" fill className="object-cover" />
                    </div>
                )}
            </div>

            {/* Footer / Actions */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <button className="flex items-center gap-2 text-muted hover:text-foreground transition-all group/action">
                        <Heart className="w-4 h-4 group-hover/action:fill-current" />
                        <span className="text-xs font-bold uppercase tracking-widest">{stats.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-muted hover:text-foreground transition-all group/action">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-widest">{stats.comments}</span>
                    </button>
                </div>
                <button className="text-muted hover:text-foreground">
                    <Share2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );

    return id ? (
        <Link href={`/community/${id}`}>
            {CardContent}
        </Link>
    ) : CardContent;
}
