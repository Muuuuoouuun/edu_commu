import Link from "next/link";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Post } from "@/lib/types";

/**
 * 커뮤니티 글 한 줄.
 * 카드가 아니라 목록 행이다 — 왼쪽에 분류, 가운데 제목과 본문, 오른쪽에 작성자와 반응.
 * 행끼리는 1px 선으로만 나뉜다.
 */
export function CommunityCard({
    id,
    type,
    author,
    content,
    stats,
    lead = false,
}: Post & { /** 목록의 첫 행이면 위에 진한 선을 긋는다 */ lead?: boolean }) {
    const isReview = type === "review";

    return (
        <article
            className={cn(
                "group relative flex flex-col gap-4 border-b border-rule py-7 sm:flex-row sm:items-baseline sm:gap-10",
                lead ? "rule-lead" : "border-t-0"
            )}
        >
            <div className="shrink-0 sm:w-10">
                <span className="text-[13px] text-graphite-faint">
                    {isReview ? "후기" : "질문"}
                </span>
            </div>

            <div className="min-w-0 flex-1">
                {isReview && typeof content.rating === "number" && (
                    <div
                        className="mb-2 flex items-center gap-0.5"
                        aria-label={`5점 만점에 ${content.rating}점`}
                    >
                        {Array.from({ length: 5 }, (_, i) => (
                            <Star
                                key={i}
                                aria-hidden="true"
                                className={cn(
                                    "h-3 w-3",
                                    i < content.rating!
                                        ? "fill-graphite text-graphite"
                                        : "text-rule-strong"
                                )}
                            />
                        ))}
                    </div>
                )}

                <h3 className="line-clamp-2 text-[22px] leading-[1.5]">
                    <Link
                        href={`/community/${id}`}
                        className="transition-opacity after:absolute after:inset-0 group-hover:opacity-60"
                    >
                        {content.title ?? content.text.split("\n")[0]}
                    </Link>
                </h3>

                {content.title && (
                    <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-[1.8] text-graphite-soft">
                        {content.text}
                    </p>
                )}
            </div>

            <div className="shrink-0 text-left sm:w-40 sm:text-right">
                <p className="text-[13px]">{author.name}</p>
                <p className="mt-1.5 text-[13px] text-graphite-faint">
                    공감 {stats.likes} · 댓글 {stats.comments}
                </p>
            </div>
        </article>
    );
}
