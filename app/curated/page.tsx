import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
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
            />

            <div className="container-page pb-16 pt-10">
                {CURATED_ITEMS.map((item, i) => (
                    <article
                        key={item.id}
                        className={`group relative flex flex-col gap-4 border-b border-rule py-9 sm:flex-row sm:items-baseline sm:gap-10 ${
                            i === 0 ? "rule-lead" : ""
                        }`}
                    >
                        <div className="shrink-0 text-[13px] text-graphite-faint sm:w-10">
                            {String(i + 1).padStart(2, "0")}
                        </div>

                        <div className="min-w-0 flex-1">
                            <h2 className="text-[26px] leading-[1.45]">
                                <a
                                    href={`#${item.id}`}
                                    className="transition-opacity after:absolute after:inset-0 group-hover:opacity-60"
                                >
                                    {item.title}
                                </a>
                            </h2>
                            <p className="mt-2.5 max-w-2xl text-[15px] leading-[1.85] text-graphite-soft">
                                {item.summary}
                            </p>
                        </div>

                        <div className="shrink-0 text-left sm:w-40 sm:text-right">
                            <p className="text-[13px]">{item.category}</p>
                            <p className="mt-1.5 text-[13px] text-graphite-faint">
                                {item.kind} · {item.readTime}
                            </p>
                        </div>
                    </article>
                ))}
            </div>
        </>
    );
}
