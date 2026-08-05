import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";
import { SketchCover } from "./SketchCover";
import type { Article } from "@/lib/content";

type Props = Article & {
    /** 첫 화면 대표 기사 — 가로로 넓게 펼친다 */
    featured?: boolean;
    className?: string;
};

export function NewsCard({
    id,
    title,
    excerpt,
    category,
    date,
    readTime,
    author,
    doodle,
    featured = false,
    className,
}: Props) {
    return (
        <article
            className={cn(
                "paper-card paper-card-hover group relative overflow-hidden",
                featured ? "sm:grid sm:grid-cols-2" : "flex h-full flex-col",
                className
            )}
        >
            <SketchCover
                seed={id}
                doodle={doodle}
                label={category}
                className={cn(
                    "border-b border-rule",
                    featured
                        ? "min-h-52 sm:min-h-full sm:border-b-0 sm:border-r"
                        : "h-40"
                )}
            />

            <div
                className={cn(
                    "flex flex-1 flex-col p-5",
                    featured && "justify-center sm:p-8"
                )}
            >
                <div className="mb-3 flex flex-wrap items-center gap-2">
                    <Badge tone="lamp">{category}</Badge>
                    <span className="text-xs text-graphite-faint">{date}</span>
                </div>

                <h3
                    className={cn(
                        "leading-snug",
                        featured ? "text-2xl sm:text-3xl" : "text-lg"
                    )}
                >
                    <Link
                        href={`/blog/${id}`}
                        className="transition-colors after:absolute after:inset-0 group-hover:text-lamp-ink"
                    >
                        {title}
                    </Link>
                </h3>

                <p
                    className={cn(
                        "mt-3 leading-relaxed text-graphite-soft",
                        featured ? "text-[15px]" : "line-clamp-3 text-sm"
                    )}
                >
                    {excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between pt-6">
                    <div className="flex items-center gap-2 text-xs text-graphite-faint">
                        <span>{author}</span>
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-1">
                            <Clock className="h-3 w-3" aria-hidden="true" />
                            {readTime}
                        </span>
                    </div>
                    <span
                        aria-hidden="true"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-lamp-ink"
                    >
                        읽기
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                </div>
            </div>
        </article>
    );
}
