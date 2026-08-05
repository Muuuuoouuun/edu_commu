import Link from "next/link";
import Image from "next/image";
import { Heart, MessageCircle, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "./Avatar";
import { Badge } from "./Badge";
import type { Post } from "@/lib/types";

function Rating({ value }: { value: number }) {
    return (
        <div className="flex items-center gap-0.5" aria-label={`5점 만점에 ${value}점`}>
            {Array.from({ length: 5 }, (_, i) => (
                <Star
                    key={i}
                    aria-hidden="true"
                    className={cn(
                        "h-3.5 w-3.5",
                        i < value ? "fill-lamp text-lamp" : "text-rule-strong"
                    )}
                />
            ))}
        </div>
    );
}

export function CommunityCard({ id, type, author, content, stats }: Post) {
    const isReview = type === "review";

    return (
        <article className="paper-card paper-card-hover group relative p-5">
            <header className="flex items-center gap-3">
                <Avatar name={author.name} src={author.avatar} size="md" />
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-sm font-bold">{author.name}</span>
                        {author.badge && (
                            <Badge tone="wood" hand>
                                {author.badge}
                            </Badge>
                        )}
                    </div>
                    <p className="mt-0.5 text-xs text-graphite-faint">{stats.time}</p>
                </div>
                <Badge tone={isReview ? "plant" : "lamp"}>
                    {isReview ? "후기" : "질문"}
                </Badge>
            </header>

            <div className="mt-4">
                {isReview && typeof content.rating === "number" && (
                    <div className="mb-2.5">
                        <Rating value={content.rating} />
                    </div>
                )}

                {content.title && (
                    <h3 className="text-lg leading-snug">
                        <Link
                            href={`/community/${id}`}
                            className="transition-colors after:absolute after:inset-0 group-hover:text-lamp-ink"
                        >
                            {content.title}
                        </Link>
                    </h3>
                )}

                <p
                    className={cn(
                        "whitespace-pre-line text-[15px] leading-relaxed text-graphite-soft",
                        content.title ? "mt-2 line-clamp-2" : "line-clamp-3"
                    )}
                >
                    {!content.title && (
                        <Link
                            href={`/community/${id}`}
                            className="after:absolute after:inset-0"
                        >
                            <span className="sr-only">글 자세히 보기: </span>
                        </Link>
                    )}
                    {content.text}
                </p>

                {content.image && (
                    <div className="relative mt-4 aspect-[16/9] overflow-hidden rounded-md border border-rule bg-paper-sunken">
                        <Image
                            src={content.image}
                            alt=""
                            fill
                            sizes="(min-width: 1024px) 640px, 100vw"
                            className="object-cover"
                        />
                    </div>
                )}
            </div>

            {/* 링크 안에 버튼을 넣지 않기 위해 통계는 표시 전용 텍스트로 둔다 */}
            <footer className="mt-5 flex items-center gap-5 border-t border-rule pt-4 text-xs text-graphite-faint">
                <span className="inline-flex items-center gap-1.5">
                    <Heart className="h-3.5 w-3.5" aria-hidden="true" />
                    공감 {stats.likes}
                </span>
                <span className="inline-flex items-center gap-1.5">
                    <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    댓글 {stats.comments}
                </span>
            </footer>
        </article>
    );
}
