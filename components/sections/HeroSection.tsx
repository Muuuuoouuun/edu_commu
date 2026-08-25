import { TextLink } from "@/components/ui/Button";
import { getPosts } from "@/lib/db-mock";

/**
 * 통계는 실제 글 데이터에서 센다.
 * 자리표시 숫자를 두면 서비스가 비어 있을 때도 1,284건이 있는 것처럼 보인다.
 */
export async function HeroSection() {
    const posts = await getPosts();

    const stats = [
        {
            label: "질문",
            value: posts.filter((post) => post.type === "question").length,
        },
        {
            label: "후기",
            value: posts.filter((post) => post.type === "review").length,
        },
        {
            label: "달린 답변",
            value: posts.reduce((sum, post) => sum + post.stats.comments, 0),
        },
    ];

    return (
        <section className="border-b border-rule">
            <div className="container-page flex flex-col justify-between gap-14 py-20 sm:py-24 lg:flex-row lg:items-end lg:gap-20">
                <div className="max-w-3xl">
                    <p className="eyebrow mb-10">학습 커뮤니티</p>

                    <h1 className="text-[34px] leading-[1.44] sm:text-5xl sm:leading-[1.44]">
                        공부하다 막힌 자리에서
                        <br />
                        먼저 지나간 사람을 만납니다.
                    </h1>

                    <p className="mt-9 max-w-lg text-base leading-[1.9] text-graphite-soft">
                        질문과 후기만 남습니다. 배너도, 랭킹도, 알림도 없습니다.
                    </p>

                    <div className="mt-11">
                        <TextLink href="/community">질문 둘러보기</TextLink>
                    </div>
                </div>

                <dl className="flex shrink-0 gap-12 lg:flex-col lg:gap-6 lg:text-right">
                    {stats.map((stat) => (
                        <div key={stat.label}>
                            <dd className="font-[family-name:var(--font-display)] text-[32px] leading-[1.3] sm:text-4xl">
                                {stat.value.toLocaleString("ko-KR")}
                            </dd>
                            <dt className="mt-0.5 text-xs text-graphite-faint">
                                {stat.label}
                            </dt>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
