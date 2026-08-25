"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { CommunityCard } from "@/components/ui/CommunityCard";
import { AdSlot } from "@/components/ui/AdSlot";
import { CreatePostModal } from "@/components/community/CreatePostModal";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { RowSkeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";
import type { Post, PostType } from "@/lib/types";

const TABS: { value: "all" | PostType; label: string }[] = [
    { value: "all", label: "전체" },
    { value: "question", label: "질문" },
    { value: "review", label: "후기" },
];

export function CommunitySection({
    /** 홈에서는 앞의 몇 건만 보여준다 */
    limit,
    showTabs = true,
}: {
    limit?: number;
    showTabs?: boolean;
} = {}) {
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

    const filtered =
        activeTab === "all" ? posts : posts.filter((post) => post.type === activeTab);
    const visible = limit ? filtered.slice(0, limit) : filtered;

    return (
        <section
            className={cn(
                "container-page pb-6",
                // 홈에서는 앞 섹션과 간격을 두고, 페이지에서는 PageHeader 바로 아래에 붙인다
                limit ? "pt-20 sm:pt-24" : "pt-10"
            )}
        >
            <CreatePostModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={() => {
                    fetchPosts();
                    setIsModalOpen(false);
                }}
            />

            {limit && (
                <div className="mb-4 flex items-baseline justify-between gap-6">
                    <p className="eyebrow">커뮤니티</p>
                    <Link
                        href="/community"
                        className="text-[13px] text-graphite-soft transition-opacity hover:opacity-60"
                    >
                        전체 보기
                    </Link>
                </div>
            )}

            {!limit && (
                <div className="mb-2 flex items-end justify-between gap-6 border-b border-rule">
                    <div
                        role="tablist"
                        aria-label="글 종류"
                        hidden={!showTabs}
                        className="flex gap-6"
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
                                    "-mb-px border-b py-3 text-sm transition-colors",
                                    active
                                        ? "border-accent text-graphite"
                                        : "border-transparent text-graphite-faint hover:text-graphite"
                                )}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                    </div>
                    <Button
                        size="sm"
                        className="mb-2"
                        onClick={() => setIsModalOpen(true)}
                    >
                        글 쓰기
                    </Button>
                </div>
            )}

            {isLoading ? (
                <div className="rule-lead">
                    <RowSkeleton />
                    <RowSkeleton />
                    <RowSkeleton />
                </div>
            ) : visible.length === 0 ? (
                <EmptyState
                    className="mt-6"
                    title="아직 글이 없어요"
                    description="첫 글을 남겨주시면 이 자리가 채워집니다. 사소한 질문일수록 환영이에요."
                    action={
                        <Button variant="outline" onClick={() => setIsModalOpen(true)}>
                            첫 글 남기기
                        </Button>
                    }
                />
            ) : (
                <div>
                    {visible.map((post, i) => (
                        <CommunityCard key={post.id} {...post} lead={i === 0} />
                    ))}
                    {!limit && (
                        <AdSlot
                            className="mt-8"
                            title="여름 방학 집중 특강 모집"
                            description="학년별 취약 단원만 골라 3주 동안 다지는 과정입니다."
                            sponsor="책상서랍 파트너"
                            cta="일정 확인하기"
                        />
                    )}
                </div>
            )}
        </section>
    );
}
