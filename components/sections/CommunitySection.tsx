"use client";

import { useCallback, useEffect, useState } from "react";
import { PenLine } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { CommunityCard } from "@/components/ui/CommunityCard";
import { AdSlot } from "@/components/ui/AdSlot";
import { CreatePostModal } from "@/components/community/CreatePostModal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { PostSkeleton } from "@/components/ui/Skeleton";
import { Doodle } from "@/components/ui/Sketch";
import { cn } from "@/lib/utils";
import type { Post, PostType } from "@/lib/types";

const TABS: { value: "all" | PostType; label: string }[] = [
    { value: "all", label: "전체" },
    { value: "question", label: "질문" },
    { value: "review", label: "후기" },
];

const TIPS = [
    "질문할 때 무엇을 이미 해봤는지 적으면 답이 빨리 옵니다.",
    "후기에는 좋았던 점과 아쉬웠던 점을 같이 남겨주세요.",
    "누군가의 답변이 도움이 됐다면 공감을 눌러 알려주세요.",
];

export function CommunitySection() {
    const [activeTab, setActiveTab] = useState<"all" | PostType>("all");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchPosts = useCallback(async () => {
        try {
            const res = await fetch("/api/posts");
            if (res.ok) setPosts(await res.json());
        } catch (error) {
            console.error("글 목록을 불러오지 못했습니다", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const filteredPosts =
        activeTab === "all" ? posts : posts.filter((post) => post.type === activeTab);

    return (
        <section className="border-t border-rule bg-paper-raised/40 py-16 sm:py-20">
            <CreatePostModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={() => {
                    fetchPosts();
                    setIsModalOpen(false);
                }}
            />

            <div className="container-page">
                <SectionHeading
                    eyebrow="편하게 말 걸어도 되는 곳"
                    title="커뮤니티"
                    description="정리된 질문이 아니어도 괜찮습니다. 막힌 지점만 적어주셔도 누군가 이어서 이야기해 줄 거예요."
                    action={
                        <Button onClick={() => setIsModalOpen(true)}>
                            <PenLine className="h-4 w-4" aria-hidden="true" />글 쓰기
                        </Button>
                    }
                    className="mb-8"
                />

                <div
                    role="tablist"
                    aria-label="글 종류"
                    className="mb-7 inline-flex rounded-full border border-rule bg-paper-sunken p-1"
                >
                    {TABS.map((tab) => {
                        const active = activeTab === tab.value;
                        return (
                            <button
                                key={tab.value}
                                role="tab"
                                type="button"
                                aria-selected={active}
                                onClick={() => setActiveTab(tab.value)}
                                className={cn(
                                    "relative rounded-full px-5 py-1.5 text-sm font-semibold transition-colors",
                                    active ? "text-lamp-ink" : "text-graphite-faint hover:text-graphite"
                                )}
                            >
                                {active && (
                                    <motion.span
                                        layoutId="community-tab"
                                        aria-hidden="true"
                                        className="absolute inset-0 rounded-full border border-rule bg-paper-raised shadow-[0_1px_0_var(--rule)]"
                                        transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
                                    />
                                )}
                                <span className="relative">{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        {isLoading ? (
                            <div className="space-y-5">
                                <PostSkeleton />
                                <PostSkeleton />
                                <PostSkeleton />
                            </div>
                        ) : filteredPosts.length === 0 ? (
                            <EmptyState
                                doodle="pencil"
                                title="아직 글이 없어요"
                                description="첫 글을 남겨주시면 이 자리가 채워집니다. 사소한 질문일수록 환영이에요."
                                action={
                                    <Button onClick={() => setIsModalOpen(true)} variant="soft">
                                        첫 글 남기기
                                    </Button>
                                }
                            />
                        ) : (
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-5"
                                >
                                    {filteredPosts.map((post, index) => (
                                        <div key={post.id} className="space-y-5">
                                            <CommunityCard {...post} />
                                            {index === 1 && (
                                                <AdSlot
                                                    doodle="book"
                                                    title="여름 방학 집중 특강 모집"
                                                    description="학년별 취약 단원만 골라 3주 동안 다지는 과정입니다."
                                                    sponsor="책상서랍 파트너"
                                                    cta="일정 확인하기"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        )}
                    </div>

                    <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
                        <div className="paper-card p-5">
                            <div className="flex items-center gap-2">
                                <Doodle name="note" className="h-6 w-6 text-plant" />
                                <h3 className="text-base">이렇게 쓰면 좋아요</h3>
                            </div>
                            <ul className="mt-4 space-y-3">
                                {TIPS.map((tip) => (
                                    <li
                                        key={tip}
                                        className="flex gap-2.5 text-sm leading-relaxed text-graphite-soft"
                                    >
                                        <span
                                            aria-hidden="true"
                                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lamp"
                                        />
                                        {tip}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <AdSlot
                            variant="panel"
                            doodle="lamp"
                            title="책상 조명 추천 기획전"
                            description="눈이 덜 피로한 색온도의 스탠드를 모았습니다."
                            sponsor="책상서랍 파트너"
                            cta="기획전 보기"
                        />
                    </aside>
                </div>
            </div>
        </section>
    );
}
