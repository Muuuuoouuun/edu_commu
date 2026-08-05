import { ButtonLink } from "@/components/ui/Button";
import { Doodle, PencilUnderline, SketchCircle } from "@/components/ui/Sketch";

const STATS = [
    { label: "쌓인 질문", value: "1,284" },
    { label: "학원·교재 후기", value: "612" },
    { label: "이번 주 답변", value: "97" },
];

export function HeroSection() {
    return (
        <section className="relative overflow-hidden border-b border-rule">
            <div aria-hidden="true" className="lamp-glow absolute inset-0" />

            <div className="container-page relative grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:items-center">
                <div>
                    <p className="hand-label mb-4">늦은 밤에도 불이 켜져 있는 곳</p>

                    <h1 className="text-3xl leading-[1.25] sm:text-4xl lg:text-5xl lg:leading-[1.2]">
                        공부하다 막히면,
                        <br />
                        <span className="relative inline-block px-1">
                            <SketchCircle />
                            <span className="relative">여기</span>
                        </span>
                        에 물어보세요.
                    </h1>

                    <p className="mt-6 max-w-xl text-base leading-relaxed text-graphite-soft sm:text-[17px]">
                        혼자 붙잡고 있던 질문, 직접 다녀본 학원 후기, 써보고 알게 된 교재
                        이야기. 잘 정리된 정답보다 <span className="highlight-mark">먼저 겪어본 사람의 말</span>이
                        필요할 때가 있으니까요.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        <ButtonLink href="/community" size="lg">
                            커뮤니티 둘러보기
                        </ButtonLink>
                        <ButtonLink href="/recommend" variant="outline" size="lg">
                            학원·교재 찾기
                        </ButtonLink>
                    </div>

                    <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-5">
                        {STATS.map((stat) => (
                            <div key={stat.label}>
                                <dt className="text-xs text-graphite-faint">
                                    {stat.label}
                                </dt>
                                <dd className="mt-1 font-[family-name:var(--font-hand)] text-2xl leading-none text-lamp-ink">
                                    {stat.value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>

                {/* 책상 위 스케치 */}
                <div className="relative hidden lg:block">
                    <div className="sketch-frame relative bg-paper-raised p-8">
                        <div
                            aria-hidden="true"
                            className="grid-paper absolute inset-3 rounded-xl opacity-40"
                        />
                        <div className="relative grid grid-cols-2 gap-6">
                            {(
                                [
                                    { name: "lamp", caption: "스탠드" },
                                    { name: "book", caption: "교재" },
                                    { name: "mug", caption: "따뜻한 차" },
                                    { name: "plant", caption: "작은 화분" },
                                ] as const
                            ).map((item) => (
                                <div
                                    key={item.name}
                                    className="flex flex-col items-center gap-2 rounded-xl border border-rule bg-paper/70 py-6"
                                >
                                    <Doodle name={item.name} className="h-12 w-12" />
                                    <span className="font-[family-name:var(--font-hand)] text-base leading-none text-graphite-faint">
                                        {item.caption}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <PencilUnderline className="mt-4 h-3 w-2/3 text-rule-strong" />
                </div>
            </div>
        </section>
    );
}
