import type { Metadata } from "next";
import { NewsCard } from "@/components/ui/NewsCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { ARTICLES } from "@/lib/content";

export const metadata: Metadata = {
    title: "매거진",
    description: "공부하는 방법에 대한 이야기를 모았습니다.",
};

export default function BlogPage() {
    return (
        <>
            <PageHeader
                eyebrow="천천히 읽어도 좋아요"
                title="매거진"
                description="공부법, 과목별 요령, 책상 환경, 그리고 마음 관리까지. 한 번에 다 바꾸지 않아도 되는 이야기들입니다."
            />

            <div className="container-page py-16">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {ARTICLES.map((article) => (
                        <NewsCard key={article.id} {...article} />
                    ))}
                </div>
            </div>
        </>
    );
}
