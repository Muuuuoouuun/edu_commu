import { ArrowRight } from "lucide-react";
import { NewsCard } from "@/components/ui/NewsCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonStyles } from "@/components/ui/Button";
import Link from "next/link";
import { ARTICLES } from "@/lib/content";

export function BlogSection() {
    const [featured, ...rest] = ARTICLES.slice(0, 4);

    return (
        <section className="container-page py-16 sm:py-20">
            <SectionHeading
                eyebrow="이번 주 읽을거리"
                title="매거진"
                description="공부하는 방법에 대한 이야기. 정답 대신 시도해볼 만한 것들을 모았습니다."
                action={
                    <Link
                        href="/blog"
                        className={buttonStyles({ variant: "outline", size: "sm" })}
                    >
                        전체 보기
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                }
                className="mb-10"
            />

            <div className="space-y-6">
                <NewsCard {...featured} featured />

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {rest.map((article) => (
                        <NewsCard key={article.id} {...article} />
                    ))}
                </div>
            </div>
        </section>
    );
}
