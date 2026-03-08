"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Send, MoreHorizontal, ThumbsUp, Loader2 } from "lucide-react";

interface Comment {
    id: string;
    author: {
        name: string;
        avatar?: string;
    };
    text: string;
    time: string;
    likes: number;
}

interface CommentSectionProps {
    postId?: string;
}

export function CommentSection({ postId }: CommentSectionProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        if (!postId) {
            setIsFetching(false);
            return;
        }

        const fetchComments = async () => {
            try {
                const res = await fetch(`/api/posts/${postId}/comments`);
                if (res.ok) {
                    const data = await res.json();
                    setComments(data);
                }
            } catch (error) {
                console.error("Failed to fetch comments", error);
            } finally {
                setIsFetching(false);
            }
        };

        fetchComments();
    }, [postId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        if (!postId) {
            const mockComment: Comment = {
                id: String(Date.now()),
                author: { name: "Guest User" },
                text: newComment,
                time: "Just now",
                likes: 0,
            };
            setComments([mockComment, ...comments]);
            setNewComment("");
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch(`/api/posts/${postId}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: newComment }),
            });

            if (res.ok) {
                const comment = await res.json();
                setComments([comment, ...comments]);
                setNewComment("");
            } else {
                alert("댓글 작성에 실패했습니다.");
            }
        } catch (error) {
            console.error("Failed to post comment", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="py-12 border-t border-border mt-12 bg-background">
            <h3 className="text-2xl font-serif font-medium mb-8 text-foreground">
                Discussion ({comments.length})
            </h3>

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
                            disabled={!newComment.trim() || isLoading}
                            className="p-2 text-muted hover:text-foreground disabled:opacity-30 transition-colors"
                        >
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Send className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                </div>
            </form>

            {/* List */}
            {isFetching ? (
                <div className="flex justify-center py-8">
                    <Loader2 className="w-5 h-5 animate-spin text-muted" />
                </div>
            ) : (
                <div className="space-y-8">
                    {comments.length === 0 && (
                        <p className="text-muted text-center py-8">
                            첫 번째 댓글을 남겨보세요!
                        </p>
                    )}
                    {comments.map((comment) => (
                        <div key={comment.id} className="flex gap-4 group">
                            <div className="relative w-8 h-8 rounded-full bg-muted overflow-hidden flex-shrink-0 mt-1">
                                {comment.author.avatar ? (
                                    <Image
                                        src={comment.author.avatar}
                                        alt={comment.author.name}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-background bg-foreground">
                                        {comment.author.name[0]}
                                    </div>
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-sm text-foreground">
                                            {comment.author.name}
                                        </span>
                                        <span className="text-xs text-muted font-medium uppercase tracking-widest">
                                            {comment.time}
                                        </span>
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
            )}
        </section>
    );
}
