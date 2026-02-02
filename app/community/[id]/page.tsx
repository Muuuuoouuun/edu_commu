"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Share2, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import { CommentSection } from "@/components/community/CommentSection";
import Link from "next/link";

interface Post {
    id: string;
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
        rating?: number;
    };
    stats: {
        likes: number;
        comments: number;
        time: string;
    };
}

export default function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [post, setPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/posts/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setPost(data);
                } else {
                    // router.push("/community"); // Redirect if not found (optional)
                }
            } catch (error) {
                console.error("Failed to fetch post", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPost();
    }, [id, router]);

    if (isLoading) {
        return <div className="min-h-screen pt-32 text-center text-muted">Loading...</div>;
    }

    if (!post) {
        return <div className="min-h-screen pt-32 text-center text-muted">Post not found.</div>;
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 md:px-6 max-w-3xl pt-24 pb-20">
                {/* Back Link */}
                <Link href="/community" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted hover:text-foreground mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    목록으로 돌아가기
                </Link>

                {/* Header */}
                <header className="mb-10">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="px-2 py-1 rounded text-[10px] uppercase tracking-widest font-bold border border-foreground/20 text-foreground/60">
                            {post.type}
                        </span>
                        <span className="text-xs text-muted font-bold uppercase tracking-widest">{post.stats.time}</span>
                    </div>
                    {post.content.title && (
                        <h1 className="text-3xl md:text-5xl font-serif font-medium text-foreground mb-6 leading-tight">
                            {post.content.title}
                        </h1>
                    )}

                    <div className="flex items-center justify-between border-y border-border py-4">
                        <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded-full bg-muted overflow-hidden">
                                {post.author.avatar ? (
                                    <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-primary text-foreground font-serif italic font-bold">
                                        {post.author.name[0]}
                                    </div>
                                )}
                            </div>
                            <div>
                                <div className="font-bold text-sm text-foreground">{post.author.name}</div>
                                <div className="text-xs text-muted">Author</div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button className="p-2 text-muted hover:text-foreground transition-colors">
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <article className="prose prose-lg prose-stone max-w-none text-foreground/90 font-sans leading-relaxed">
                    {post.content.image && (
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-10 bg-muted">
                            <Image src={post.content.image} alt={post.content.title || "Post Image"} fill className="object-cover" />
                        </div>
                    )}
                    <div className="whitespace-pre-line">
                        {post.content.text}
                    </div>
                </article>

                {/* Action Bar */}
                <div className="flex items-center gap-6 mt-12 py-6 border-y border-border">
                    <button className="flex items-center gap-2 text-muted hover:text-accent-rose transition-colors group">
                        <Heart className="w-6 h-6 group-hover:fill-current" />
                        <span className="font-medium">{post.stats.likes} Likes</span>
                    </button>
                    <button className="flex items-center gap-2 text-muted hover:text-foreground transition-colors">
                        <MessageCircle className="w-6 h-6" />
                        <span className="font-medium">{post.stats.comments} Comments</span>
                    </button>
                </div>

                {/* Comments */}
                <CommentSection />
            </div>
        </div>
    );
}
