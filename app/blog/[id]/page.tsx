import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { ARTICLES, getArticle } from "@/lib/content";
import { Badge } from "@/components/ui/Badge";
import { NewsCard } from "@/components/ui/NewsCard";

export function generateStaticParams() {
    return ARTICLES.map((article) => ({ id: article.id }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const article = getArticle(id);
    if (!article) return { title: "찾을 수 없는 글" };
    return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const article = getArticle(id);

    if (!article) notFound();

    const related = ARTICLES.filter((item) => item.id !== article.id).slice(0, 3);

    return (
        <article className="pb-20">
            <div className="container-read pt-10">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-graphite-soft transition-colors hover:text-accent"
                >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    매거진으로 돌아가기
                </Link>

                <header className="mt-8">
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge tone="accent">{article.category}</Badge>
                        <span className="text-xs text-graphite-faint">{article.date}</span>
                    </div>

                    <h1 className="mt-4 text-3xl leading-tight sm:text-4xl">
                        {article.title}
                    </h1>

                    <p className="mt-5 text-[17px] leading-relaxed text-graphite-soft">
                        {article.excerpt}
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-sm text-graphite-faint">
                        <span>{article.author}</span>
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                            {article.readTime} 분량
                        </span>
                    </div>
                </header>

                <div className="mt-10 space-y-6">
                    {article.body.map((block) =>
                        block.startsWith("## ") ? (
                            <h2
                                key={block}
                                className="pt-4 text-xl leading-snug sm:text-2xl"
                            >
                                {block.slice(3)}
                            </h2>
                        ) : (
                            <p
                                key={block}
                                className="text-[17px] leading-[1.85] text-graphite-soft"
                            >
                                {block}
                            </p>
                        )
                    )}
                </div>

                <div className="my-14 border-t border-rule" />

                <h2 className="mb-6 text-xl">이어서 읽어보세요</h2>
            </div>

            <div className="container-page">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {related.map((item) => (
                        <NewsCard key={item.id} {...item} />
                    ))}
                </div>
            </div>
        </article>
    );
}
