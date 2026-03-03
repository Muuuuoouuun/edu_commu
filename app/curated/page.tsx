"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const CURATED_RESOURCES = [
    {
        id: 1,
        title: "AI 시대 학습 설계: 상위 1%의 공부 루틴",
        category: "Learning Design",
        type: "Article",
        author: "LUMIERE Editorial",
        readTime: "8 min read",
        image: "/images/generated/curated/ai-learning.svg",
        summary: "성과를 만드는 학습 루틴을 구조화하는 방법을 실제 사례 중심으로 정리했습니다."
    },
    {
        id: 2,
        title: "입시 전략의 본질: 데이터로 보는 선택과 집중",
        category: "Strategy",
        type: "Insight",
        author: "Dr. Sarah Kim",
        readTime: "10 min read",
        image: "/images/generated/curated/strategy-data.svg",
        summary: "목표 대학/학과별 전략을 데이터 기반으로 설계하는 프레임워크를 제안합니다."
    },
    {
        id: 3,
        title: "몰입을 만드는 공간: 집에서 구현하는 프리미엄 스터디존",
        category: "Lifestyle",
        type: "Guide",
        author: "Lumiere Design Lab",
        readTime: "7 min read",
        image: "/images/generated/curated/study-zone.svg",
        summary: "작은 공간에서도 집중력을 끌어올리는 조명, 컬러, 동선 설계 팁을 담았습니다."
    }
];

export default function CuratedPage() {
    return (
        <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-text-strong)]">
            <section className="content-container pt-28 md:pt-36 pb-16 md:pb-24">
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="editorial-eyebrow mb-5"
                >
                    CURATION JOURNAL
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="text-4xl md:text-6xl font-semibold leading-[1.1] tracking-[-0.02em] max-w-4xl"
                >
                    블로그 스타일의 고급 큐레이션,
                    <br className="hidden md:block" />
                    우아하고 절제된 Apple 감성 레이아웃.
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mt-8 text-lg max-w-2xl leading-relaxed text-[var(--color-text-secondary)]"
                >
                    긴 글을 천천히 읽고 사고를 확장할 수 있도록, 미니멀한 타이포와 넓은 여백 중심으로 구성했습니다.
                </motion.p>
            </section>

            <section className="content-container pb-24 md:pb-32">
                <div className="grid grid-cols-1 gap-7">
                    {CURATED_RESOURCES.map((item, index) => (
                        <motion.article
                            key={item.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08 }}
                            className="surface-card group"
                        >
                            <div className="grid md:grid-cols-[1.15fr_1fr]">
                                <div className="relative min-h-[270px] md:min-h-[340px]">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                    />
                                </div>

                                <div className="p-7 md:p-10 flex flex-col justify-between">
                                    <div>
                                        <div className="editorial-eyebrow flex items-center gap-3 mb-4">
                                            <span>{item.category}</span>
                                            <span>·</span>
                                            <span>{item.type}</span>
                                        </div>
                                        <h2 className="section-title leading-tight">{item.title}</h2>
                                        <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
                                            {item.summary}
                                        </p>
                                    </div>

                                    <div className="mt-8 flex items-center justify-between">
                                        <div className="text-sm text-[var(--color-text-tertiary)]">
                                            <p>{item.author}</p>
                                            <p className="mt-1">{item.readTime}</p>
                                        </div>
                                        <button className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full border border-black/10 hover:border-black/20 hover:bg-black/[0.03] transition-colors">
                                            읽어보기 <ArrowUpRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </section>
        </div>
    );
}
