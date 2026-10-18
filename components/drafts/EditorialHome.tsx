"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Heart, MessageCircle, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    ACADEMIES,
    BOOKS,
    COMMUNITY_THREADS,
    CURATED_PICKS,
    LEARNING_APPS,
    MAGAZINE_ARTICLES,
    MOST_READ,
    NAV_LINKS,
    REGIONS,
    TOPICS,
    type Region,
    type ThreadType,
} from "@/lib/home-content";

// 시안 A — Editorial Journal: 종이 매거진처럼 읽히는 차분한 타이포그래피 중심 레이아웃

const CONTAINER = "mx-auto w-full max-w-7xl px-5 md:px-10";
const THREAD_FILTERS: ("전체" | ThreadType)[] = ["전체", "질문", "후기", "토론"];

export function EditorialHome() {
    return (
        <div className="min-h-screen bg-paper text-ink">
            <Masthead />
            <main>
                <LeadStories />
                <TopicIndex />
                <Conversations />
                <CuratorShelf />
                <RegionGuide />
                <Newsletter />
            </main>
            <EditorialFooter />
        </div>
    );
}

function SectionHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description?: string; action?: React.ReactNode }) {
    return (
        <div className="mb-10 flex flex-col gap-6 border-t-2 border-ink pt-5 md:flex-row md:items-end md:justify-between">
            <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta">{eyebrow}</p>
                <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
                {description && <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink/60">{description}</p>}
            </div>
            {action}
        </div>
    );
}

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link href={href} className="group inline-flex items-center gap-1.5 text-sm font-semibold">
            <span className="border-b border-ink/30 pb-0.5 transition-colors group-hover:border-ink">{children}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
    );
}

function Masthead() {
    return (
        <header className={CONTAINER}>
            <div className="flex items-center justify-between border-b border-rule py-3 text-xs text-ink/60">
                <span>2026년 10월호</span>
                <span className="hidden tracking-[0.12em] sm:block">VOL. 24 · AUTUMN</span>
                <div className="flex items-center gap-4">
                    <Link href="/login" className="hover:text-ink">로그인</Link>
                    <a href="#newsletter" className="font-semibold text-ink">구독하기</a>
                </div>
            </div>

            <div className="py-10 text-center md:py-14">
                <Link href="/drafts/editorial" className="font-display text-5xl font-bold tracking-tight md:text-7xl">
                    LUMIERE<span className="text-terracotta">.</span>
                </Link>
                <p className="mt-3 text-sm text-ink/60 md:text-base">배움을 깊게 읽는 교육 저널</p>
            </div>

            <nav className="flex items-center justify-between gap-6 border-y-2 border-ink py-3">
                <ul className="flex gap-6 overflow-x-auto whitespace-nowrap text-sm font-semibold md:gap-10">
                    {NAV_LINKS.map((link) => (
                        <li key={link.href}>
                            <Link href={link.href} className="transition-colors hover:text-terracotta">{link.label}</Link>
                        </li>
                    ))}
                </ul>
                <button aria-label="검색" className="shrink-0 rounded-full p-1.5 transition-colors hover:bg-ink/5">
                    <Search className="h-4 w-4" />
                </button>
            </nav>
        </header>
    );
}

function LeadStories() {
    const [cover, ...rest] = MAGAZINE_ARTICLES;
    const notes = rest.slice(0, 2);

    return (
        <section className={cn(CONTAINER, "py-10 md:py-14")}>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-0">
                {/* Cover story */}
                <article className="group lg:order-2 lg:col-span-6 lg:border-x lg:border-rule lg:px-8">
                    <Link href="/blog" className="block">
                        <div className="relative aspect-[4/3] overflow-hidden bg-paper-deep">
                            <Image src={cover.image} alt="" fill priority className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
                        </div>
                        <p className="mt-6 text-xs font-semibold tracking-[0.04em] text-terracotta">{cover.category}</p>
                        <h1 className="mt-3 font-display text-3xl font-semibold leading-[1.3] tracking-tight md:text-[2.6rem] md:leading-[1.25]">
                            {cover.title}
                        </h1>
                        <p className="mt-4 text-base leading-relaxed text-ink/70 md:text-lg">{cover.excerpt}</p>
                        <p className="mt-5 text-sm text-ink/50">{cover.author} · {cover.readTime} 읽기</p>
                    </Link>
                </article>

                {/* Editor's notes */}
                <div className="lg:order-1 lg:col-span-3 lg:pr-8">
                    <p className="mb-5 text-xs font-semibold tracking-[0.04em] text-ink/50">에디터의 노트</p>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
                        {notes.map((article) => (
                            <article key={article.id} className="group border-t border-rule pt-5">
                                <Link href="/blog" className="grid grid-cols-[1fr_6.5rem] gap-4 lg:block">
                                    <div className="relative order-2 aspect-square overflow-hidden bg-paper-deep lg:mb-4 lg:aspect-[3/2]">
                                        <Image src={article.image} alt="" fill className="object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-terracotta">{article.category}</p>
                                        <h3 className="mt-2 font-display text-lg font-semibold leading-snug group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4 lg:text-xl">
                                            {article.title}
                                        </h3>
                                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/60">{article.excerpt}</p>
                                    </div>
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>

                {/* Most read */}
                <aside className="lg:order-3 lg:col-span-3 lg:pl-8">
                    <p className="mb-5 text-xs font-semibold tracking-[0.04em] text-ink/50">많이 읽은 글</p>
                    <ol className="divide-y divide-rule border-y border-rule">
                        {MOST_READ.map((title, index) => (
                            <li key={title}>
                                <Link href="/blog" className="group flex gap-4 py-4">
                                    <span className="font-display text-2xl font-semibold leading-none text-terracotta/80">{String(index + 1).padStart(2, "0")}</span>
                                    <span className="text-[15px] font-medium leading-snug group-hover:underline group-hover:underline-offset-4">{title}</span>
                                </Link>
                            </li>
                        ))}
                    </ol>
                    <div className="mt-8 bg-forest p-6 text-paper">
                        <p className="text-xs font-semibold tracking-[0.04em] text-paper/60">이번 호의 질문</p>
                        <p className="mt-3 font-display text-lg leading-snug">“아이가 스스로 고른 과목은, 끝까지 공부하게 될까?”</p>
                        <Link href="/community" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-butter">
                            의견 남기기 <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </aside>
            </div>
        </section>
    );
}

function TopicIndex() {
    return (
        <section className="bg-paper-deep py-14 md:py-20">
            <div className={CONTAINER}>
                <SectionHeading eyebrow="Index" title="주제별로 읽기" action={<TextLink href="/blog">매거진 전체 보기</TextLink>} />
                <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                    {TOPICS.map((topic) => (
                        <Link key={topic.name} href="/blog" className="group block border-t border-ink/80 pt-5">
                            <div className="flex items-baseline justify-between">
                                <h3 className="font-display text-2xl font-semibold">{topic.name}</h3>
                                <span className="text-xs text-ink/50">{topic.count}편</span>
                            </div>
                            <p className="mt-1 text-sm text-ink/60">{topic.description}</p>
                            <ul className="mt-5 space-y-2.5">
                                {topic.headlines.map((headline) => (
                                    <li key={headline} className="flex gap-2 text-[15px] leading-snug">
                                        <span aria-hidden className="text-terracotta">—</span>
                                        <span className="group-hover:underline group-hover:underline-offset-4">{headline}</span>
                                    </li>
                                ))}
                            </ul>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Conversations() {
    const [filter, setFilter] = useState<(typeof THREAD_FILTERS)[number]>("전체");
    const [featured, ...others] = COMMUNITY_THREADS;
    const list = others.filter((thread) => filter === "전체" || thread.type === filter);

    return (
        <section className={cn(CONTAINER, "py-16 md:py-24")}>
            <SectionHeading
                eyebrow="Community"
                title="오늘의 대화"
                description="학부모와 학생, 선생님이 같은 질문 앞에서 함께 묻고 답합니다."
                action={
                    <Link href="/community" className="inline-flex items-center gap-2 self-start rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-opacity hover:opacity-90 md:self-auto">
                        질문 남기기 <ArrowUpRight className="h-4 w-4" />
                    </Link>
                }
            />

            <div className="grid gap-10 lg:grid-cols-12">
                <Link href="/community" className="group relative flex flex-col justify-between bg-forest p-8 text-paper md:p-10 lg:col-span-5">
                    <div>
                        <span aria-hidden className="block font-display text-7xl leading-none text-terracotta">“</span>
                        <p className="mt-2 text-xs font-semibold tracking-[0.04em] text-paper/60">가장 많이 참여한 질문</p>
                        <h3 className="mt-4 font-display text-2xl font-semibold leading-snug md:text-3xl">{featured.title}</h3>
                        <p className="mt-4 leading-relaxed text-paper/75">{featured.excerpt}</p>
                    </div>
                    {featured.bestAnswer && (
                        <div className="mt-8 border-t border-paper/20 pt-6">
                            <p className="text-xs font-semibold text-butter">채택된 답변 · {featured.bestAnswer.author} ({featured.bestAnswer.role})</p>
                            <p className="mt-2 text-sm leading-relaxed text-paper/80">{featured.bestAnswer.text}</p>
                        </div>
                    )}
                    <div className="mt-8 flex items-center justify-between text-sm text-paper/60">
                        <span>{featured.role} · {featured.region}</span>
                        <span className="inline-flex items-center gap-1.5 font-semibold text-paper group-hover:underline">
                            대화 {featured.comments}개 보기 <ArrowRight className="h-4 w-4" />
                        </span>
                    </div>
                </Link>

                <div className="lg:col-span-7">
                    <div role="tablist" aria-label="게시글 유형" className="flex gap-6 border-b border-rule text-sm">
                        {THREAD_FILTERS.map((item) => (
                            <button
                                key={item}
                                role="tab"
                                aria-selected={filter === item}
                                onClick={() => setFilter(item)}
                                className={cn(
                                    "-mb-px border-b-2 pb-3 font-semibold transition-colors",
                                    filter === item ? "border-ink text-ink" : "border-transparent text-ink/45 hover:text-ink"
                                )}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                    <ul className="divide-y divide-rule">
                        {list.map((thread) => (
                            <li key={thread.id}>
                                <Link href="/community" className="group grid grid-cols-[3.5rem_1fr] gap-4 py-5">
                                    <span
                                        className={cn(
                                            "pt-0.5 text-xs font-semibold",
                                            thread.type === "질문" && "text-terracotta",
                                            thread.type === "후기" && "text-forest",
                                            thread.type === "토론" && "text-plum"
                                        )}
                                    >
                                        {thread.type}
                                    </span>
                                    <div>
                                        <h4 className="text-[17px] font-semibold leading-snug group-hover:underline group-hover:underline-offset-4">{thread.title}</h4>
                                        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink/50">
                                            <span>{thread.role} · {thread.region}</span>
                                            <span>{thread.time}</span>
                                            <span className="inline-flex items-center gap-1"><Heart className="h-3.5 w-3.5" />{thread.likes}</span>
                                            {thread.answered ? (
                                                <span className="inline-flex items-center gap-1"><MessageCircle className="h-3.5 w-3.5" />{thread.comments}</span>
                                            ) : (
                                                <span className="font-semibold text-terracotta">첫 답변을 기다려요</span>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {list.length === 0 && <p className="py-10 text-center text-sm text-ink/50">아직 이 유형의 대화가 없습니다.</p>}
                </div>
            </div>
        </section>
    );
}

function CuratorShelf() {
    return (
        <section className={cn(CONTAINER, "pb-16 md:pb-24")}>
            <SectionHeading eyebrow="Curation" title="큐레이터의 서가" description="천천히 읽을수록 남는 글을 골랐습니다." action={<TextLink href="/curated">큐레이션 전체 보기</TextLink>} />
            <div className="grid gap-10 md:grid-cols-3 md:gap-8">
                {CURATED_PICKS.map((pick) => (
                    <article key={pick.id} className="group">
                        <Link href="/curated" className="block">
                            <div className="relative aspect-[3/2] overflow-hidden border border-rule bg-paper-deep">
                                <Image src={pick.image} alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                            </div>
                            <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/50">{pick.category} · {pick.type}</p>
                            <h3 className="mt-2 font-display text-xl font-semibold leading-snug group-hover:underline group-hover:underline-offset-4">{pick.title}</h3>
                            <p className="mt-3 text-sm leading-relaxed text-ink/60">{pick.summary}</p>
                            <p className="mt-4 text-xs text-ink/45">{pick.author} · {pick.readTime} 읽기</p>
                        </Link>
                    </article>
                ))}
            </div>
        </section>
    );
}

function RegionGuide() {
    const [region, setRegion] = useState<Region>("목동");
    const academies = ACADEMIES.filter((academy) => academy.region === region);

    return (
        <section className="border-y border-rule bg-[#efeadf] py-16 md:py-24">
            <div className={CONTAINER}>
                <SectionHeading
                    eyebrow="Local Guide"
                    title="우리 동네 교육 지도"
                    description="지역별 학원과 과목별 교재·앱을 한 장의 표로 비교해 보세요."
                    action={
                        <div role="tablist" aria-label="지역 선택" className="flex gap-1 self-start rounded-full border border-ink/20 p-1 md:self-auto">
                            {REGIONS.map((item) => (
                                <button
                                    key={item}
                                    role="tab"
                                    aria-selected={region === item}
                                    onClick={() => setRegion(item)}
                                    className={cn(
                                        "rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
                                        region === item ? "bg-ink text-paper" : "text-ink/60 hover:text-ink"
                                    )}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    }
                />

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[720px] border-collapse text-left">
                        <thead>
                            <tr className="border-b border-ink text-xs font-semibold tracking-[0.04em] text-ink/50">
                                <th className="w-24 pb-3 font-semibold">과목</th>
                                <th className="pb-3 font-semibold">{region} 추천 학원</th>
                                <th className="pb-3 font-semibold">교재</th>
                                <th className="pb-3 font-semibold">학습 앱</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-rule">
                            {academies.map((academy) => {
                                const book = BOOKS.find((item) => item.subject === academy.subject);
                                const app = LEARNING_APPS.find((item) => item.subject === academy.subject);
                                return (
                                    <tr key={academy.name} className="align-top">
                                        <td className="py-6 pr-4 font-display text-xl font-semibold">{academy.subject}</td>
                                        <td className="py-6 pr-6">
                                            <a href={academy.mapUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 font-semibold hover:text-terracotta">
                                                {academy.name} <ArrowUpRight className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100" />
                                            </a>
                                            <p className="mt-1 text-sm text-ink/60">{academy.description}</p>
                                            <p className="mt-2 text-xs text-ink/45">{academy.district} · ★ {academy.rating} · 후기 {academy.reviews}</p>
                                        </td>
                                        <td className="py-6 pr-6">
                                            {book && (
                                                <a href={book.kyoboUrl} target="_blank" rel="noopener noreferrer" className="group flex gap-3">
                                                    <Image src={book.cover} alt="" width={36} height={52} className="h-[52px] w-9 shrink-0 border border-rule object-cover" />
                                                    <span>
                                                        <span className="block font-semibold group-hover:text-terracotta">{book.title}</span>
                                                        <span className="mt-1 block text-xs text-ink/50">{book.level}</span>
                                                    </span>
                                                </a>
                                            )}
                                        </td>
                                        <td className="py-6">
                                            {app && (
                                                <a href={app.link} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3">
                                                    <Image src={app.icon} alt="" width={36} height={36} className="rounded-lg border border-rule" />
                                                    <span>
                                                        <span className="block font-semibold group-hover:text-terracotta">{app.name}</span>
                                                        <span className="mt-0.5 block text-xs text-ink/50">{app.description}</span>
                                                    </span>
                                                </a>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="mt-8">
                    <TextLink href="/recommend">조건별로 더 자세히 찾기</TextLink>
                </div>
            </div>
        </section>
    );
}

function Newsletter() {
    return (
        <section id="newsletter" className={cn(CONTAINER, "py-16 md:py-24")}>
            <div className="grid items-center gap-8 bg-ink p-8 text-paper md:p-14 lg:grid-cols-2">
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-butter">Newsletter</p>
                    <h2 className="mt-4 font-display text-3xl font-semibold leading-snug md:text-4xl">
                        매주 일요일 아침,
                        <br />
                        교육 편지 한 통.
                    </h2>
                    <p className="mt-4 text-paper/65">이번 주 가장 많이 읽힌 글과 놓치면 아쉬운 대화만 골라 보내드립니다.</p>
                </div>
                <form className="flex flex-col gap-3 sm:flex-row" onSubmit={(event) => event.preventDefault()}>
                    <label htmlFor="newsletter-email" className="sr-only">이메일</label>
                    <input
                        id="newsletter-email"
                        type="email"
                        placeholder="이메일 주소"
                        className="h-12 flex-1 border-b border-paper/40 bg-transparent px-1 text-paper placeholder:text-paper/40 focus:border-paper focus:outline-none"
                    />
                    <button type="submit" className="h-12 rounded-full bg-paper px-7 text-sm font-semibold text-ink transition-opacity hover:opacity-90">
                        구독하기
                    </button>
                </form>
            </div>
        </section>
    );
}

function EditorialFooter() {
    const columns = [
        { title: "읽기", links: [{ label: "매거진", href: "/blog" }, { label: "큐레이션", href: "/curated" }] },
        { title: "참여", links: [{ label: "커뮤니티", href: "/community" }, { label: "로그인", href: "/login" }] },
        { title: "찾기", links: [{ label: "학원/교재 추천", href: "/recommend" }] },
        { title: "안내", links: [{ label: "개인정보처리방침", href: "/privacy" }, { label: "이용약관", href: "/terms" }, { label: "문의하기", href: "/contact" }] },
    ];

    return (
        <footer className={cn(CONTAINER, "pb-16")}>
            <div className="grid gap-10 border-t-2 border-ink pt-10 md:grid-cols-[1.5fr_repeat(4,1fr)]">
                <div>
                    <p className="font-display text-3xl font-bold">LUMIERE<span className="text-terracotta">.</span></p>
                    <p className="mt-3 text-sm text-ink/55">배움을 깊게 읽는 교육 저널</p>
                </div>
                {columns.map((column) => (
                    <div key={column.title}>
                        <p className="text-xs font-semibold text-ink/45">{column.title}</p>
                        <ul className="mt-3 space-y-2 text-sm">
                            {column.links.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="hover:text-terracotta">{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <p className="mt-12 text-xs text-ink/45">© 2026 Lumiere Education. All rights reserved.</p>
        </footer>
    );
}
