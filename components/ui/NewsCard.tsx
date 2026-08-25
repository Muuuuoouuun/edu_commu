import Link from "next/link";
import { SketchCover } from "./SketchCover";
import { cn } from "@/lib/utils";
import type { Article } from "@/lib/content";

/** 매거진 카드 — 캐러셀과 목록에서 같은 모양을 쓴다. */
export function NewsCard({
    id,
    title,
    excerpt,
    category,
    date,
    readTime,
    author,
    doodle,
    className,
}: Article & { className?: string }) {
    return (
        <article
            className={cn(
                "group relative flex flex-col border border-rule transition-colors hover:border-rule-strong",
                className
            )}
        >
            <SketchCover
                doodle={doodle}
                label={category}
                className="h-[150px] border-b border-rule"
            />
            <div className="flex flex-1 flex-col p-6">
                <p className="text-xs text-graphite-faint">{date}</p>
                <h3 className="mt-3 text-xl leading-[1.5]">
                    <Link href={`/blog/${id}`} className="after:absolute after:inset-0">
                        {title}
                    </Link>
                </h3>
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-graphite-soft">
                    {excerpt}
                </p>
                <p className="mt-auto pt-6 text-[13px] text-graphite-faint">
                    {author} · {readTime}
                </p>
            </div>
        </article>
    );
}
