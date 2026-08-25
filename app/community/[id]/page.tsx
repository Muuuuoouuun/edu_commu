"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Heart, MessageCircle, Star } from "lucide-react";
import { CommentSection } from "@/components/community/CommentSection";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";
import { buttonStyles } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { Post } from "@/lib/types";

export default function PostDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const [post, setPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let active = true;

        (async () => {
            try {
                const res = await fetch(`/api/posts/${id}`);
                if (res.ok && active) setPost(await res.json());
            } catch (error) {
                console.error("글을 불러오지 못했습니다", error);
            } finally {
                if (active) setIsLoading(false);
            }
        })();

        return () => {
            active = false;
        };
    }, [id]);

    if (isLoading) {
        return (
            <div className="container-read space-y-4 py-16">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-9 w-3/4" />
                <Skeleton className="h-4 w-40" />
                <Skeleton className="mt-8 h-48 w-full" />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="container-read py-20">
                <EmptyState
                    title="글을 찾을 수 없어요"
                    description="삭제되었거나 주소가 잘못되었을 수 있습니다."
                    action={
                        <Link
                            href="/community"
                            className={buttonStyles({ variant: "outline" })}
                        >
                            커뮤니티로 돌아가기
                        </Link>
                    }
                />
            </div>
        );
    }

    const isReview = post.type === "review";

    return (
        <div className="container-read py-10 pb-20">
            <Link
                href="/community"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-graphite-soft transition-colors hover:text-accent"
            >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                목록으로 돌아가기
            </Link>

            <header className="mt-8">
                <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="neutral">
                        {isReview ? "후기" : "질문"}
                    </Badge>
                    <span className="text-xs text-graphite-faint">{post.stats.time}</span>
                </div>

                {isReview && typeof post.content.rating === "number" && (
                    <div
                        className="mt-4 flex items-center gap-0.5"
                        aria-label={`5점 만점에 ${post.content.rating}점`}
                    >
                        {Array.from({ length: 5 }, (_, i) => (
                            <Star
                                key={i}
                                aria-hidden="true"
                                className={cn(
                                    "h-4 w-4",
                                    i < post.content.rating!
                                        ? "fill-accent text-accent"
                                        : "text-rule-strong"
                                )}
                            />
                        ))}
                    </div>
                )}

                {post.content.title && (
                    <h1 className="mt-4 text-2xl leading-tight sm:text-3xl">
                        {post.content.title}
                    </h1>
                )}

                <div className="mt-6 flex items-center gap-3 border-y border-rule py-4">
                    <Avatar
                        name={post.author.name}
                        src={post.author.avatar}
                        size="md"
                    />
                    <div>
                        <div className="flex items-center gap-1.5">
                            <span className="text-sm font-bold">{post.author.name}</span>
                            {post.author.badge && (
                                <Badge tone="neutral">
                                    {post.author.badge}
                                </Badge>
                            )}
                        </div>
                        <p className="mt-0.5 text-xs text-graphite-faint">작성자</p>
                    </div>
                </div>
            </header>

            <article className="mt-8">
                {post.content.image && (
                    <div className="relative mb-8 aspect-video overflow-hidden border border-rule bg-paper-sunken">
                        <Image
                            src={post.content.image}
                            alt=""
                            fill
                            sizes="(min-width: 768px) 768px, 100vw"
                            className="object-cover"
                        />
                    </div>
                )}
                <p className="whitespace-pre-line text-[17px] leading-[1.85] text-graphite-soft">
                    {post.content.text}
                </p>
            </article>

            {/* 공감·댓글 수는 아직 목데이터 기준 표시 전용 */}
            <div className="mt-10 flex items-center gap-6 border-y border-rule py-4 text-sm text-graphite-faint">
                <span className="inline-flex items-center gap-2">
                    <Heart className="h-4 w-4" aria-hidden="true" />
                    공감 {post.stats.likes}
                </span>
                <span className="inline-flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    댓글 {post.stats.comments}
                </span>
            </div>

            <div className="my-12 border-t border-rule" />

            <CommentSection />
        </div>
    );
}
