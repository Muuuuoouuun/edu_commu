"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SketchCover } from "@/components/ui/SketchCover";
import { PencilUnderline } from "@/components/ui/Sketch";
import { cn } from "@/lib/utils";
import { ARTICLES } from "@/lib/content";

/**
 * 화면에서 유일하게 색과 그림을 허용한 구역.
 * 카드는 채움도 그림자도 없이 1px 실선으로만 잡고, 오른쪽 끝에서 다음 카드가
 * 잘려 보이게 두어 더 있다는 것을 알린다. 손글씨는 눈썹 문구·과목 라벨·
 * 인덱스 세 군데에만 쓴다.
 */

const CARD_WIDTH = 320;
const GAP = 24;
const STEP = CARD_WIDTH + GAP;

export function MagazineCarousel() {
    const trackRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);
    const [thumb, setThumb] = useState(1);
    const [index, setIndex] = useState(0);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);

    const sync = useCallback(() => {
        const track = trackRef.current;
        if (!track) return;

        const max = track.scrollWidth - track.clientWidth;
        const left = track.scrollLeft;

        setAtStart(left <= 1);
        setAtEnd(left >= max - 1);
        setIndex(Math.min(ARTICLES.length - 1, Math.round(left / STEP)));
        // 진행 바는 스크롤바의 thumb처럼 — 보이는 비율만큼의 막대가 좌우로 움직인다
        setThumb(track.scrollWidth > 0 ? track.clientWidth / track.scrollWidth : 1);
        setProgress(max <= 0 ? 0 : left / max);
    }, []);

    useEffect(() => {
        sync();
        const track = trackRef.current;
        if (!track) return;

        window.addEventListener("resize", sync);
        return () => window.removeEventListener("resize", sync);
    }, [sync]);

    function scrollBy(direction: -1 | 1) {
        trackRef.current?.scrollBy({ left: direction * STEP, behavior: "smooth" });
    }

    // 트랙이 화면 오른쪽 끝까지 흐르도록 섹션은 오른쪽 여백을 쓰지 않는다
    return (
        <section className="pb-20 pt-16 sm:pt-20">
            <div className="mx-auto w-full max-w-6xl pl-6 sm:pl-10">
                <div className="mb-8 flex items-end justify-between gap-6 pr-6 sm:pr-10">
                    <div>
                        <p className="hand-label mb-2">이번 주 읽을거리</p>
                        <h2 className="relative inline-block text-3xl">
                            매거진
                            <PencilUnderline className="absolute -bottom-2 left-0 h-2 w-full text-accent" />
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <span
                            aria-hidden="true"
                            className="font-[family-name:var(--font-hand)] text-lg leading-none text-graphite-faint"
                        >
                            {String(index + 1).padStart(2, "0")} /{" "}
                            {String(ARTICLES.length).padStart(2, "0")}
                        </span>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => scrollBy(-1)}
                                disabled={atStart}
                                aria-label="이전 글 보기"
                                className={cn(
                                    "grid h-10 w-10 place-items-center rounded-full border transition-colors",
                                    atStart
                                        ? "border-rule text-graphite-faint/50"
                                        : "border-graphite text-graphite hover:bg-paper-sunken"
                                )}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <button
                                type="button"
                                onClick={() => scrollBy(1)}
                                disabled={atEnd}
                                aria-label="다음 글 보기"
                                className={cn(
                                    "grid h-10 w-10 place-items-center rounded-full border transition-colors",
                                    atEnd
                                        ? "border-rule text-graphite-faint/50"
                                        : "border-graphite text-graphite hover:bg-paper-sunken"
                                )}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    ref={trackRef}
                    onScroll={sync}
                    tabIndex={0}
                    role="group"
                    aria-label="매거진 글 목록"
                    className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-1"
                >
                    {ARTICLES.map((article) => (
                        <article
                            key={article.id}
                            style={{ width: CARD_WIDTH }}
                            className="group relative shrink-0 snap-start border border-rule transition-colors hover:border-rule-strong"
                        >
                            <SketchCover
                                doodle={article.doodle}
                                label={article.category}
                                className="h-[150px] border-b border-rule"
                            />
                            <div className="p-6">
                                <p className="text-xs text-graphite-faint">{article.date}</p>
                                <h3 className="mt-3 text-xl leading-[1.5]">
                                    <Link
                                        href={`/blog/${article.id}`}
                                        className="after:absolute after:inset-0"
                                    >
                                        {article.title}
                                    </Link>
                                </h3>
                                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-graphite-soft">
                                    {article.excerpt}
                                </p>
                                <p className="mt-6 text-[13px] text-graphite-faint">
                                    {article.author} · {article.readTime}
                                </p>
                            </div>
                        </article>
                    ))}
                    {/* 마지막 카드 뒤 여백 — 오른쪽 끝까지 밀어붙지 않게 한다 */}
                    <div aria-hidden="true" className="w-6 shrink-0 sm:w-10" />
                </div>

                <div className="mt-7 pr-6 sm:pr-10">
                    <div className="h-0.5 bg-rule">
                        <div
                            aria-hidden="true"
                            className="h-0.5 bg-accent transition-transform duration-200"
                            style={{
                                width: `${thumb * 100}%`,
                                transform: `translateX(${
                                    (progress * (1 - thumb) * 100) / (thumb || 1)
                                }%)`,
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
