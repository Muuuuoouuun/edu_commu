import type { Metadata } from "next";
import { ArrowUpRight, Clock } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { SketchCover } from "@/components/ui/SketchCover";
import { CURATED_ITEMS } from "@/lib/content";

export const metadata: Metadata = {
    title: "큐레이션",
    description: "길게 읽을 만한 글을 골라 모았습니다.",
};

export default function CuratedPage() {
    return (
        <>
            <PageHeader
                eyebrow="한 편씩 천천히"
                title="큐레이션"
                description="짧게 훑기보다 한 편을 끝까지 읽는 편이 남습니다. 여백을 넉넉히 두고 고른 글들입니다."
                doodle="note"
            />

            <div className="container-page py-14">
                <div className="space-y-7">
                    {CURATED_ITEMS.map((item) => (
                        <article
                            key={item.id}
                            className="paper-card paper-card-hover group relative overflow-hidden md:grid md:grid-cols-[1.05fr_1.3fr]"
                        >
                            <SketchCover
                                seed={item.id}
                                doodle={item.doodle}
                                label={item.category}
                                className="min-h-56 border-b border-rule md:border-b-0 md:border-r"
                            />

                            <div className="flex flex-col justify-between p-6 sm:p-9">
                                <div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <Badge tone="lamp">{item.category}</Badge>
                                        <Badge tone="neutral">{item.kind}</Badge>
                                    </div>

                                    <h2 className="mt-4 text-xl leading-snug sm:text-2xl">
                                        <a
                                            href={`#${item.id}`}
                                            className="transition-colors after:absolute after:inset-0 group-hover:text-lamp-ink"
                                        >
                                            {item.title}
                                        </a>
                                    </h2>

                                    <p className="mt-4 text-[15px] leading-relaxed text-graphite-soft">
                                        {item.summary}
                                    </p>
                                </div>

                                <div className="mt-8 flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-xs text-graphite-faint">
                                        <span>{item.author}</span>
                                        <span aria-hidden="true">·</span>
                                        <span className="inline-flex items-center gap-1">
                                            <Clock className="h-3 w-3" aria-hidden="true" />
                                            {item.readTime}
                                        </span>
                                    </div>
                                    <span
                                        aria-hidden="true"
                                        className="inline-flex items-center gap-1 text-sm font-semibold text-lamp-ink"
                                    >
                                        읽어보기
                                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </>
    );
}
