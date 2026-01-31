"use client";

import { Heart, MessageCircle, Share2, MoreHorizontal, Star } from "lucide-react";
import Image from "next/image";
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

export function CommunityCard({ type, author, content, stats }: CommunityCardProps) {
    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                        {author.avatar ? (
                            <Image src={author.avatar} alt={author.name} fill className="object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-accent-rose/10 text-accent-rose font-bold">
                                {author.name[0]}
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-slate-900">{author.name}</span>
                            {author.badge && (
                                <span className="text-[10px] items-center px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-medium border border-indigo-100">
                                    {author.badge}
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-slate-400">{stats.time}</p>
                    </div>
                </div>
                <button className="text-slate-300 hover:text-slate-600">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>

            {/* Content */}
            <div className="mb-4">
                {type === "review" && content.rating && (
                    <div className="flex items-center gap-1 mb-2 text-accent-gold">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={cn("w-4 h-4 fill-current", i < content.rating! ? "" : "text-slate-200 fill-slate-200")} />
                        ))}
                    </div>
                )}

                {content.title && <h4 className="font-bold text-lg mb-2 text-slate-800">{content.title}</h4>}

                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line mb-4">
                    {content.text}
                </p>

                {content.image && (
                    <div className="relative w-full h-[240px] overflow-hidden rounded-xl border border-slate-100 mb-4">
                        <Image src={content.image} alt="Post content" fill className="object-cover" />
                    </div>
                )}
            </div>

            {/* Footer / Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-slate-400 hover:text-accent-rose transition-colors group">
                        <Heart className="w-5 h-5 group-hover:fill-current" />
                        <span className="text-xs font-medium">{stats.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-slate-400 hover:text-primary-soft transition-colors group">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-xs font-medium">{stats.comments}</span>
                    </button>
                </div>
                <button className="text-slate-400 hover:text-slate-600">
                    <Share2 className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
