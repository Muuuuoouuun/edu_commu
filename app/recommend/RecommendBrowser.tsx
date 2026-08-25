"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ExternalLink, Search } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { AdSlot } from "@/components/ui/AdSlot";
import { cn } from "@/lib/utils";
import {
    ACADEMIES,
    ADS,
    APP_SERVICES,
    BOOKS,
    INTERESTS,
    REGIONS,
    type Interest,
    type Region,
} from "@/lib/recommend-data";


/** 선택된 조건과 얼마나 맞는지 점수를 매겨 정렬 */
function matches(text: string, query: string) {
    return query
        ? text.toLowerCase().includes(query.toLowerCase().trim())
        : false;
}

function ChipGroup<T extends string>({
    label,
    options,
    value,
    onChange,
}: {
    label: string;
    options: readonly T[];
    value: T;
    onChange: (next: T) => void;
}) {
    return (
        <div>
            <p className="eyebrow mb-2.5 block">{label}</p>
            <div role="group" aria-label={label} className="flex flex-wrap gap-2">
                {options.map((option) => {
                    const active = option === value;
                    return (
                        <button
                            key={option}
                            type="button"
                            aria-pressed={active}
                            onClick={() => onChange(option)}
                            className={cn(
                                "border px-4 py-1.5 text-sm transition-colors",
                                active
                                    ? "border-accent bg-paper-sunken text-accent"
                                    : "border-rule bg-paper-raised text-graphite-soft hover:border-rule-strong hover:text-graphite"
                            )}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

function SectionTitle({ title, count }: { title: string; count: number }) {
    return (
        <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-rule pb-3">
            <h2 className="text-xl">{title}</h2>
            <span className="text-[13px] text-graphite-faint">{count}건</span>
        </div>
    );
}

export function RecommendBrowser({
    /** 서버에서 미리 받아 둔 교재 표지 */
    coverMap,
}: {
    coverMap: Record<string, string>;
}) {
    const [query, setQuery] = useState("");
    const [region, setRegion] = useState<Region>("전체");
    const [interest, setInterest] = useState<Interest>("수학");


    const academies = useMemo(
        () =>
            ACADEMIES.map((academy) => {
                let score = 0;
                if (academy.focus === interest) score += 60;
                if (region === "전체" || academy.regionTag === region) score += 40;
                if (
                    matches(
                        [academy.name, academy.district, academy.description].join(" "),
                        query
                    )
                )
                    score += 20;
                return { academy, score };
            })
                .filter((entry) => entry.score > 0)
                .sort((a, b) => b.score - a.score)
                .map((entry) => entry.academy),
        [interest, region, query]
    );

    const books = useMemo(
        () =>
            BOOKS.map((book) => {
                let score = 0;
                if (book.subject === interest) score += 70;
                if (matches([book.title, book.description].join(" "), query)) score += 30;
                return { book, score };
            })
                .filter((entry) => entry.score > 0)
                .sort((a, b) => b.score - a.score)
                .map((entry) => entry.book),
        [interest, query]
    );

    const apps = useMemo(
        () =>
            APP_SERVICES.map((item) => {
                let score = 0;
                if (item.focus === interest) score += 65;
                if (region === "전체" || item.targetRegions.includes(region)) score += 35;
                if (matches([item.name, item.description].join(" "), query)) score += 20;
                return { item, score };
            })
                .filter((entry) => entry.score > 0)
                .sort((a, b) => b.score - a.score)
                .map((entry) => entry.item),
        [interest, region, query]
    );

    const ad = useMemo(
        () =>
            ADS.map((item) => {
                let score = 0;
                if (item.targetInterests.includes(interest)) score += 65;
                if (region === "전체" || item.targetRegions.includes(region)) score += 35;
                return { item, score };
            }).sort((a, b) => b.score - a.score)[0]?.item,
        [interest, region]
    );

    const totalCount = academies.length + books.length + apps.length;

    return (
        <>
            <PageHeader
                eyebrow="발품 대신 여기서 먼저"
                title="학원·교재 추천"
                description="지역과 관심 과목을 고르면 학원, 교재, 학습 앱을 함께 추려서 보여드립니다. 후기는 커뮤니티에서 확인해 보세요."
            />

            <div className="container-page pb-16 pt-10">
                {/* 조건 고르기 */}
                <div className="paper-card p-6 sm:p-7">
                    <div className="grid gap-6 sm:grid-cols-2">
                        <ChipGroup
                            label="어느 지역인가요?"
                            options={REGIONS}
                            value={region}
                            onChange={setRegion}
                        />
                        <ChipGroup
                            label="어떤 과목인가요?"
                            options={INTERESTS}
                            value={interest}
                            onChange={setInterest}
                        />
                    </div>

                    <div className="mt-6">
                        <label htmlFor="recommend-search" className="eyebrow mb-2.5 block">
                            찾는 이름이 있다면
                        </label>
                        <div className="flex items-center gap-3 border border-rule bg-paper-sunken px-4 py-3 focus-within:border-accent">
                            <Search
                                className="h-4 w-4 shrink-0 text-graphite-faint"
                                aria-hidden="true"
                            />
                            <input
                                id="recommend-search"
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="학원 이름, 교재 이름, 지역 등"
                                className="w-full bg-transparent text-sm outline-none"
                            />
                        </div>
                    </div>

                    <p className="mt-5 border-t border-rule pt-4 text-sm text-graphite-soft">
                        <span className="font-semibold text-graphite">{region}</span> 지역의{" "}
                        <span className="font-semibold text-graphite">{interest}</span> 관련
                        추천 <span className="font-semibold text-accent">{totalCount}</span>건
                    </p>
                </div>

                {ad && (
                    <AdSlot
                        className="mt-6"
                        title={ad.title}
                        description={ad.description}
                        cta={ad.cta}
                        href={ad.link}
                        sponsor="책상서랍 파트너"
                    />
                )}

                {totalCount === 0 && (
                    <EmptyState
                        className="mt-10"
                        title="조건에 맞는 추천이 없어요"
                        description="검색어를 지우거나 지역을 '전체'로 바꿔보시면 결과가 나올 거예요."
                    />
                )}

                {/* 학원 */}
                {academies.length > 0 && (
                    <section className="mt-14">
                        <SectionTitle
                            title="가까운 학원"
                            count={academies.length}
                        />
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {academies.map((academy) => (
                                <article
                                    key={academy.name}
                                    className="paper-card paper-card-hover flex flex-col p-5"
                                >
                                    <div className="flex items-center gap-2">
                                        <Badge tone="accent">{academy.focus}</Badge>
                                        <Badge tone="neutral">{academy.regionTag}</Badge>
                                    </div>
                                    <h3 className="mt-3.5 text-lg">{academy.name}</h3>
                                    <p className="mt-1 text-xs text-graphite-faint">
                                        {academy.district}
                                    </p>
                                    <p className="mt-3 flex-1 text-sm leading-relaxed text-graphite-soft">
                                        {academy.description}
                                    </p>
                                    <a
                                        href={academy.naverMapUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
                                    >
                                        네이버 지도에서 보기
                                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                                    </a>
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                {/* 교재 */}
                {books.length > 0 && (
                    <section className="mt-14">
                        <SectionTitle
                            title="함께 보면 좋은 교재"
                            count={books.length}
                        />
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {books.map((book) => {
                                const cover =
                                    coverMap[book.title] ?? book.fallbackCoverImageUrl;
                                const isRemote = cover.startsWith("http");

                                return (
                                    <article
                                        key={book.title}
                                        className="paper-card paper-card-hover flex flex-col p-5"
                                    >
                                        <div className="flex items-start gap-4">
                                            {isRemote ? (
                                                // 원격 표지는 도메인이 고정되지 않아 next/image 대신 img를 쓴다
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={cover}
                                                    alt=""
                                                    loading="lazy"
                                                    className="h-20 w-14 shrink-0 rounded-md border border-rule bg-paper-sunken object-cover"
                                                />
                                            ) : (
                                                <Image
                                                    src={cover}
                                                    alt=""
                                                    width={56}
                                                    height={80}
                                                    className="h-20 w-14 shrink-0 rounded-md border border-rule bg-paper-sunken object-cover"
                                                />
                                            )}
                                            <div className="min-w-0">
                                                <Badge tone="neutral">{book.subject}</Badge>
                                                <h3 className="mt-2.5 text-base leading-snug">
                                                    {book.title}
                                                </h3>
                                                <p className="mt-1 text-xs text-graphite-faint">
                                                    {book.level}
                                                </p>
                                            </div>
                                        </div>

                                        <p className="mt-4 flex-1 text-sm leading-relaxed text-graphite-soft">
                                            {book.description}
                                        </p>

                                        <div className="mt-5 flex items-center gap-4 border-t border-rule pt-4 text-sm font-semibold">
                                            <a
                                                href={book.kyoboUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-accent hover:underline"
                                            >
                                                교보문고
                                                <ExternalLink
                                                    className="h-3.5 w-3.5"
                                                    aria-hidden="true"
                                                />
                                            </a>
                                            <a
                                                href={book.yes24Url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-accent hover:underline"
                                            >
                                                YES24
                                                <ExternalLink
                                                    className="h-3.5 w-3.5"
                                                    aria-hidden="true"
                                                />
                                            </a>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </section>
                )}

                {/* 앱/서비스 */}
                {apps.length > 0 && (
                    <section className="mt-14">
                        <SectionTitle
                            title="학습 앱·서비스"
                            count={apps.length}
                        />
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {apps.map((item) => (
                                <article
                                    key={item.name}
                                    className="paper-card paper-card-hover flex flex-col p-5"
                                >
                                    <div className="flex items-start gap-3">
                                        <Image
                                            src={item.icon}
                                            alt=""
                                            width={40}
                                            height={40}
                                            className="rounded-xl border border-rule bg-paper-sunken"
                                        />
                                        <div>
                                            <div className="flex items-center gap-1.5">
                                                <Badge tone="neutral">{item.category}</Badge>
                                                <Badge tone="accent">{item.focus}</Badge>
                                            </div>
                                            <h3 className="mt-2 text-base">{item.name}</h3>
                                        </div>
                                    </div>

                                    <p className="mt-4 flex-1 text-sm leading-relaxed text-graphite-soft">
                                        {item.description}
                                    </p>

                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
                                    >
                                        바로가기
                                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                                    </a>
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                <div className="mt-16 flex items-start gap-3 border border-dashed border-rule-strong p-5">
                    <p className="text-sm leading-relaxed text-graphite-soft">
                        여기 실린 추천은 편집팀이 정리한 참고 정보입니다. 실제 등록 전에는
                        직접 상담을 받아보시고, 다녀오신 뒤에는 커뮤니티에 후기를
                        남겨주시면 다음 사람에게 큰 도움이 됩니다.
                    </p>
                </div>
            </div>
        </>
    );
}
