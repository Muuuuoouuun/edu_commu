"use client";

import { useState } from "react";
import Image from "next/image";
import { Send, MoreHorizontal, ThumbsUp } from "lucide-react";

// Mock Comment Data
const COMMENTS = [
    {
        id: 1,
        author: {
            name: "David Park",
            avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=2574&auto=format&fit=crop"
        },
        text: "This is exactly what I was looking for. The point about optogenetics really clarified things for me.",
        time: "2h ago",
        likes: 5
    },
    {
        id: 2,
        author: {
            name: "Sarah Kim",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop"
        },
        text: "Could you elaborate more on the second paragraph? I feel like there's a nuance I'm missing regarding the stress response modulators.",
        time: "5h ago",
        likes: 2
    }
];

export function CommentSection() {
    const [comments, setComments] = useState(COMMENTS);
    const [newComment, setNewComment] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        // Mock Optimistic Update
        const mockComment = {
            id: Date.now(),
            author: {
                name: "Guest User", // Replace with real auth user later
                avatar: ""
            },
            text: newComment,
            time: "Just now",
            likes: 0
        };

        setComments([mockComment, ...comments]);
        setNewComment("");
    };

    return (
        <section className="py-12 border-t border-border mt-12 bg-background">
            <h3 className="text-2xl font-serif font-medium mb-8 text-foreground">Discussion ({comments.length})</h3>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex gap-4 mb-12">
                <div className="w-10 h-10 rounded-full bg-muted flex-shrink-0" />
                <div className="flex-1 relative">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add to the discussion..."
                        className="w-full bg-transparent border-b border-border focus:border-foreground py-2 px-0 outline-none transition-colors min-h-[40px] resize-none"
                    />
                    <div className="absolute right-0 bottom-2">
                        <button
                            type="submit"
                            disabled={!newComment.trim()}
                            className="p-2 text-muted hover:text-foreground disabled:opacity-30 transition-colors"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </form>

            {/* List */}
            <div className="space-y-8">
                {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4 group">
                        <div className="relative w-8 h-8 rounded-full bg-muted overflow-hidden flex-shrink-0 mt-1">
                            {comment.author.avatar ? (
                                <Image src={comment.author.avatar} alt={comment.author.name} fill className="object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-background bg-foreground">
                                    {comment.author.name[0]}
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-sm text-foreground">{comment.author.name}</span>
                                    <span className="text-xs text-muted font-medium uppercase tracking-widest">{comment.time}</span>
                                </div>
                                <button className="opacity-0 group-hover:opacity-100 transition-opacity text-muted hover:text-foreground">
                                    <MoreHorizontal className="w-4 h-4" />
                                </button>
                            </div>
                            <p className="text-foreground/80 text-sm leading-relaxed mb-3">
                                {comment.text}
                            </p>
                            <div className="flex items-center gap-4">
                                <button className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted hover:text-foreground transition-colors">
                                    <ThumbsUp className="w-3 h-3" />
                                    <span>{comment.likes || "Like"}</span>
                                </button>
                                <button className="text-xs font-bold uppercase tracking-widest text-muted hover:text-foreground transition-colors">
                                    Reply
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
