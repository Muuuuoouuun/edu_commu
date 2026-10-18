"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    ArrowUpRight,
    BookOpen,
    Check,
    CircleCheck,
    Coffee,
    Compass,
    Flame,
    GraduationCap,
    Heart,
    House,
    Lightbulb,
    MapPin,
    MessageCircle,
    MessagesSquare,
    PenLine,
    Plus,
    School,
    Search,
    Sparkles,
    Star,
    User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    ACADEMIES,
    BOOKS,
    COMMUNITY_THREADS,
    LEARNING_APPS,
    MAGAZINE_ARTICLES,
    NAV_LINKS,
    POPULAR_KEYWORDS,
    REGIONS,
    SUBJECTS,
    WEEKLY_POLL,
    type CommunityThread,
    type Region,
    type Subject,
    type ThreadType,
} from "@/lib/home-content";

// 시안 B — Community Hub: 검색과 참여를 앞세운 앱 같은 벤토 그리드 레이아웃

const CONTAINER = "mx-auto w-full max-w-7xl px-4 md:px-8";
const THREAD_FILTERS: ("전체" | ThreadType)[] = ["전체", "질문", "후기", "토론"];

const LIVE_ACTIVITY = [
    { who: "목동 중2맘", initial: "목", tone: "bg-terracotta", action: "답변을 남겼어요", target: "수학 선행 vs 심화", time: "방금" },
    { who: "대치 고1", initial: "대", tone: "bg-forest", action: "후기를 올렸어요", target: "소수정예 영어학원 3개월", time: "4분 전" },
    { who: "분당 초5맘", initial: "분", tone: "bg-plum", action: "투표에 참여했어요", target: "겨울방학 특강", time: "9분 전" },
    { who: "강남 중3맘", initial: "강", tone: "bg-[#3d5566]", action: "질문을 올렸어요", target: "자사고 vs 일반고", time: "12분 전" },
];

const ANSWER_PREVIEWS = [
    { who: "목동 고2맘", tone: "bg-terracotta", text: "저희 아이도 같은 고민이었는데, 심화 한 권을 끝내고 선행을 시작하니 훨씬 수월했어요." },
    { who: "수학 좋아하는 고1", tone: "bg-plum", text: "선행만 빨리 나가면 고1 첫 시험에서 심화 문제에 막혀요. 경험담입니다." },
];

const CATEGORIES = [
    { label: "입시 상담", icon: GraduationCap, tone: "bg-blush text-terracotta" },
    { label: "학원 후기", icon: School, tone: "bg-sage text-forest" },
    { label: "교재 추천", icon: BookOpen, tone: "bg-butter text-[#866419]" },
    { label: "공부법", icon: Lightbulb, tone: "bg-lilac text-plum" },
    { label: "학부모 라운지", icon: Coffee, tone: "bg-mist text-[#3d5566]" },
    { label: "진로 탐색", icon: Compass, tone: "bg-paper-deep text-ink" },
];

const TYPE_TONE: Record<ThreadType, string> = {
    질문: "bg-terracotta/10 text-terracotta",
    후기: "bg-forest/10 text-forest",
    토론: "bg-plum/10 text-plum",
};

export function HubHome() {
    return (
        <div className="min-h-screen bg-[#f6f3ec] text-ink">
            <HubHeader />
            <main className="space-y-16 md:space-y-24">
                <Hero />
                <QuickCategories />
                <Trending />
                <PersonalizedPicks />
                <MagazineStrip />
                <JoinBanner />
            </main>
            <HubFooter />
            <MobileTabBar />
        </div>
    );
}

function SectionHeading({ kicker, icon: Icon, title, description, action, dark }: {
    kicker: string;
    icon: React.ElementType;
    title: string;
    description?: string;
    action?: React.ReactNode;
    dark?: boolean;
}) {
    return (
        <div className="mb-6 flex flex-col gap-5 md:mb-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
                <p className={cn("inline-flex items-center gap-1.5 text-sm font-bold", dark ? "text-butter" : "text-terracotta")}>
                    <Icon className="h-4 w-4" /> {kicker}
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight md:text-4xl">{title}</h2>
                {description && <p className={cn("mt-2 text-[15px]", dark ? "text-paper/60" : "text-ink/55")}>{description}</p>}
            </div>
            {action}
        </div>
    );
}

function SegmentedControl<T extends string>({ label, options, value, onChange, dark }: {
    label: string;
    options: readonly T[];
    value: T;
    onChange: (value: T) => void;
    dark?: boolean;
}) {
    return (
        <div role="radiogroup" aria-label={label} className={cn("flex w-max gap-1 rounded-full p-1", dark ? "bg-white/10" : "bg-white ring-1 ring-ink/5")}>
            {options.map((option) => (
                <button
                    key={option}
                    role="radio"
                    aria-checked={value === option}
                    onClick={() => onChange(option)}
                    className={cn(
                        "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                        value === option
                            ? dark ? "bg-paper text-ink" : "bg-ink text-paper"
                            : dark ? "text-paper/70 hover:text-paper" : "text-ink/55 hover:text-ink"
                    )}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}

function Avatar({ initial, tone, className }: { initial: string; tone: string; className?: string }) {
    return (
        <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-bold text-white", tone, className)}>
            {initial}
        </span>
    );
}

function TypeBadge({ type }: { type: ThreadType }) {
    return <span className={cn("rounded-full px-2.5 py-1 text-xs font-bold", TYPE_TONE[type])}>{type}</span>;
}

function HubHeader() {
    return (
        <header className="sticky top-0 z-50 pt-3">
            <div className={CONTAINER}>
                <div className="flex h-14 items-center justify-between gap-4 rounded-full border border-ink/5 bg-white/85 pl-5 pr-2 shadow-[0_8px_30px_rgba(29,27,24,0.07)] backdrop-blur-xl">
                    <Link href="/drafts/hub" className="text-lg font-black tracking-tight">
                        LUMIERE<span className="text-terracotta">.</span>
                    </Link>
                    <nav className="hidden items-center gap-1 text-sm font-semibold md:flex">
                        {NAV_LINKS.map((link) => (
                            <Link key={link.href} href={link.href} className="rounded-full px-4 py-2 text-ink/65 transition-colors hover:bg-ink/5 hover:text-ink">
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                    <div className="flex items-center gap-1.5">
                        <button aria-label="검색" className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-ink/5">
                            <Search className="h-[18px] w-[18px]" />
                        </button>
                        <Link href="/community" className="hidden h-10 items-center gap-1.5 rounded-full bg-terracotta px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:inline-flex">
                            <PenLine className="h-4 w-4" /> 글쓰기
                        </Link>
                        <Link href="/login" aria-label="로그인" className="grid h-10 w-10 place-items-center rounded-full bg-ink text-paper">
                            <User className="h-[18px] w-[18px]" />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

function Hero() {
    const [region, setRegion] = useState<Region>("목동");

    return (
        <section className={cn(CONTAINER, "mb-6 pt-6 md:mb-8 md:pt-10")}>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
                <div
                    className="relative overflow-hidden rounded-[32px] bg-ink p-7 text-paper md:p-12"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 92% 0%, rgba(196, 98, 58, 0.55), transparent 42%), radial-gradient(circle at 30% 120%, rgba(91, 122, 100, 0.45), transparent 48%)",
                    }}
                >
                    <div className="relative">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terracotta opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-terracotta" />
                            </span>
                            지금 1,284명이 이야기 나누는 중
                        </span>
                        <h1 className="mt-6 text-[2.5rem] font-black leading-[1.15] tracking-tight md:text-6xl">
                            우리 아이 공부,
                            <br />
                            혼자 고민하지 마세요.
                        </h1>
                        <p className="mt-5 max-w-lg text-base leading-relaxed text-paper/70 md:text-lg">
                            같은 동네, 같은 학년의 학부모와 선배들이 직접 겪은 학원·교재·공부법 이야기를 나눕니다.
                        </p>

                        <form role="search" onSubmit={(event) => event.preventDefault()} className="mt-8 flex flex-col gap-2 rounded-3xl bg-white p-2 text-ink sm:flex-row sm:items-center sm:rounded-full">
                            <label className="flex items-center gap-1.5 rounded-full bg-paper px-4 py-2.5 text-sm font-semibold">
                                <MapPin className="h-4 w-4 text-terracotta" />
                                <select aria-label="지역" value={region} onChange={(event) => setRegion(event.target.value as Region)} className="bg-transparent outline-none">
                                    {REGIONS.map((item) => (
                                        <option key={item} value={item}>{item}</option>
                                    ))}
                                </select>
                            </label>
                            <label className="flex flex-1 items-center gap-2 px-3">
                                <Search className="h-4 w-4 shrink-0 text-ink/40" />
                                <input aria-label="검색어" placeholder="학원, 교재, 공부법을 검색해 보세요" className="h-11 w-full bg-transparent text-[15px] outline-none placeholder:text-ink/40" />
                            </label>
                            <button type="submit" className="h-11 rounded-full bg-terracotta px-6 text-sm font-bold text-white transition-opacity hover:opacity-90">
                                검색
                            </button>
                        </form>

                        <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
                            <span className="mr-1 text-paper/45">인기 검색어</span>
                            {POPULAR_KEYWORDS.map((keyword) => (
                                <button key={keyword} className="rounded-full border border-white/15 px-3 py-1.5 text-paper/80 transition-colors hover:bg-white/10">
                                    #{keyword}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div className="col-span-2 rounded-[32px] bg-butter p-5 md:p-6">
                        <div className="flex items-center justify-between">
                            <p className="inline-flex items-center gap-2 font-bold">
                                <span className="h-2 w-2 rounded-full bg-terracotta" /> 실시간 활동
                            </p>
                            <Link href="/community" className="text-sm font-semibold text-ink/55 hover:text-ink">전체 보기</Link>
                        </div>
                        <ul className="mt-4 space-y-2.5">
                            {LIVE_ACTIVITY.map((item) => (
                                <li key={item.who} className="flex items-center gap-3 rounded-2xl bg-white/75 p-3.5">
                                    <Avatar initial={item.initial} tone={item.tone} />
                                    <p className="min-w-0 flex-1 text-sm leading-snug">
                                        <span className="font-bold">{item.who}</span>님이 <span className="font-semibold">‘{item.target}’</span>에 {item.action}
                                    </p>
                                    <span className="shrink-0 text-xs text-ink/45">{item.time}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="rounded-[28px] bg-sage p-5 md:rounded-[32px] md:p-6">
                        <p className="text-sm font-semibold text-forest/80">이번 주 새 질문</p>
                        <p className="mt-3 text-3xl font-black tracking-tight md:text-4xl">1,284</p>
                        <p className="mt-1 text-sm font-semibold text-forest">지난주보다 12% ↑</p>
                    </div>
                    <div className="rounded-[28px] bg-lilac p-5 md:rounded-[32px] md:p-6">
                        <p className="text-sm font-semibold text-plum/80">첫 답변까지 평균</p>
                        <p className="mt-3 text-3xl font-black tracking-tight md:text-4xl">18분</p>
                        <p className="mt-1 text-sm font-semibold text-plum">인증 멘토 340명 활동 중</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function QuickCategories() {
    return (
        <section className={CONTAINER} aria-label="카테고리 바로가기">
            <ul className="grid grid-cols-3 gap-3 md:grid-cols-6">
                {CATEGORIES.map(({ label, icon: Icon, tone }) => (
                    <li key={label}>
                        <Link href="/community" className="flex h-full flex-col items-center gap-3 rounded-3xl bg-white p-4 text-sm font-semibold shadow-sm ring-1 ring-ink/5 transition hover:-translate-y-0.5 hover:shadow-md md:p-5">
                            <span className={cn("grid h-12 w-12 place-items-center rounded-2xl", tone)}>
                                <Icon className="h-5 w-5" />
                            </span>
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}

function Trending() {
    const [filter, setFilter] = useState<(typeof THREAD_FILTERS)[number]>("전체");
    const threads = COMMUNITY_THREADS.filter((thread) => thread.answered && (filter === "전체" || thread.type === filter));
    const waiting = COMMUNITY_THREADS.filter((thread) => !thread.answered);
    const [featured, ...rest] = threads;

    return (
        <section className={CONTAINER}>
            <SectionHeading
                kicker="실시간 인기"
                icon={Flame}
                title="지금 뜨는 이야기"
                action={<SegmentedControl label="게시글 유형" options={THREAD_FILTERS} value={filter} onChange={setFilter} />}
            />
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                {featured && <FeaturedThread thread={featured} />}
                <WaitingQuestions threads={waiting} />
                <PollCard />
                {rest.slice(0, 3).map((thread) => (
                    <ThreadCard key={thread.id} thread={thread} />
                ))}
            </div>
        </section>
    );
}

function FeaturedThread({ thread }: { thread: CommunityThread }) {
    return (
        <Link href="/community" className="group flex flex-col rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-ink/5 transition-shadow hover:shadow-md md:p-8 lg:col-span-7 lg:row-span-2">
            <div className="flex flex-wrap items-center gap-2">
                <TypeBadge type={thread.type} />
                {thread.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-paper px-2.5 py-1 text-xs text-ink/60">#{tag}</span>
                ))}
            </div>
            <h3 className="mt-5 text-2xl font-bold leading-snug tracking-tight group-hover:text-terracotta md:text-[1.75rem]">{thread.title}</h3>
            <p className="mt-3 leading-relaxed text-ink/65">{thread.excerpt}</p>
            <p className="mt-3 text-sm text-ink/45">{thread.role} · {thread.region} · {thread.time}</p>

            {thread.bestAnswer && (
                <div className="mt-6 rounded-2xl bg-paper p-5">
                    <p className="inline-flex items-center gap-1.5 text-xs font-bold text-forest">
                        <CircleCheck className="h-4 w-4" /> 베스트 답변
                    </p>
                    <p className="mt-2 text-[15px] leading-relaxed">{thread.bestAnswer.text}</p>
                    <div className="mt-4 flex items-center gap-2 text-xs text-ink/55">
                        <Avatar initial={thread.bestAnswer.author[0]} tone="bg-forest" className="h-7 w-7" />
                        <span className="font-semibold text-ink">{thread.bestAnswer.author}</span> {thread.bestAnswer.role}
                    </div>
                </div>
            )}

            {thread.answered && (
                <ul className="mt-4 hidden space-y-2 lg:block">
                    {ANSWER_PREVIEWS.map((answer) => (
                        <li key={answer.who} className="flex items-start gap-3 rounded-2xl px-1 py-2 text-sm">
                            <Avatar initial={answer.who[0]} tone={answer.tone} className="h-7 w-7" />
                            <p className="min-w-0 flex-1 leading-relaxed text-ink/70">
                                <span className="mr-1.5 font-semibold text-ink">{answer.who}</span>
                                {answer.text}
                            </p>
                        </li>
                    ))}
                </ul>
            )}

            <div className="mt-auto flex items-center justify-between pt-6 text-sm text-ink/55">
                <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                        {["bg-terracotta", "bg-forest", "bg-plum"].map((tone) => (
                            <span key={tone} className={cn("h-7 w-7 rounded-full ring-2 ring-white", tone)} />
                        ))}
                    </div>
                    <span>{thread.comments}명 참여 중</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="inline-flex items-center gap-1"><Heart className="h-4 w-4" />{thread.likes}</span>
                    <span className="inline-flex items-center gap-1"><MessageCircle className="h-4 w-4" />{thread.comments}</span>
                </div>
            </div>
        </Link>
    );
}

function WaitingQuestions({ threads }: { threads: CommunityThread[] }) {
    return (
        <div className="rounded-[28px] bg-blush p-6 lg:col-span-5">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">답변을 기다리는 질문</h3>
                <span className="rounded-full bg-terracotta px-2.5 py-0.5 text-xs font-bold text-white">{threads.length}</span>
            </div>
            <p className="mt-1 text-sm text-ink/60">경험 한 줄이 누군가에겐 큰 힘이 됩니다.</p>
            <ul className="mt-4 space-y-2">
                {threads.map((thread) => (
                    <li key={thread.id}>
                        <Link href="/community" className="flex items-center gap-3 rounded-2xl bg-white/80 p-3.5 transition-colors hover:bg-white">
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold">{thread.title}</p>
                                <p className="mt-0.5 text-xs text-ink/50">{thread.role} · {thread.region} · {thread.time}</p>
                            </div>
                            <span className="shrink-0 rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-paper">답변하기</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function PollCard() {
    const [choice, setChoice] = useState<number | null>(null);
    const votes = WEEKLY_POLL.votes + (choice === null ? 0 : 1);

    return (
        <div className="rounded-[28px] bg-sage p-6 lg:col-span-5">
            <div className="flex items-center justify-between text-sm">
                <span className="font-bold text-forest">이번 주 투표</span>
                <span className="text-xs text-ink/50">{votes.toLocaleString("ko-KR")}명 참여</span>
            </div>
            <h3 className="mt-2 text-lg font-bold">{WEEKLY_POLL.question}</h3>
            <div className="mt-4 space-y-2">
                {WEEKLY_POLL.options.map((option, index) => (
                    <button
                        key={option.label}
                        aria-pressed={choice === index}
                        onClick={() => setChoice(index)}
                        className={cn(
                            "relative w-full overflow-hidden rounded-xl bg-white/70 px-4 py-3 text-left text-sm font-semibold transition-shadow",
                            choice === index && "ring-2 ring-forest"
                        )}
                    >
                        <span className="absolute inset-y-0 left-0 bg-forest/15" style={{ width: `${option.percent}%` }} />
                        <span className="relative flex items-center justify-between">
                            <span className="inline-flex items-center gap-1.5">
                                {choice === index && <Check className="h-4 w-4 text-forest" />}
                                {option.label}
                            </span>
                            <span className="text-ink/60">{option.percent}%</span>
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}

function ThreadCard({ thread }: { thread: CommunityThread }) {
    return (
        <Link href="/community" className="group flex flex-col rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-ink/5 transition-shadow hover:shadow-md lg:col-span-4">
            <div className="flex items-center justify-between">
                <TypeBadge type={thread.type} />
                <span className="text-xs text-ink/45">{thread.time}</span>
            </div>
            <h3 className="mt-4 text-lg font-bold leading-snug group-hover:text-terracotta">{thread.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/60">{thread.excerpt}</p>
            <div className="mt-auto flex items-center gap-4 pt-5 text-xs text-ink/50">
                <span>{thread.role} · {thread.region}</span>
                <span className="ml-auto inline-flex items-center gap-1"><Heart className="h-3.5 w-3.5" />{thread.likes}</span>
                <span className="inline-flex items-center gap-1"><MessageCircle className="h-3.5 w-3.5" />{thread.comments}</span>
            </div>
        </Link>
    );
}

function PersonalizedPicks() {
    const [region, setRegion] = useState<Region>("목동");
    const [subject, setSubject] = useState<Subject>("수학");
    const academies = ACADEMIES.filter((academy) => academy.region === region);
    const academy = academies.find((item) => item.subject === subject) ?? academies[0];
    const others = academies.filter((item) => item !== academy);
    const book = BOOKS.find((item) => item.subject === subject);
    const app = LEARNING_APPS.find((item) => item.subject === subject);

    return (
        <section className={CONTAINER}>
            <div className="rounded-[36px] bg-forest p-6 text-paper md:p-10">
                <SectionHeading
                    dark
                    kicker="맞춤 추천"
                    icon={Sparkles}
                    title={`${region} · ${subject}, 이렇게 시작해 보세요`}
                    description="지역과 관심 과목을 고르면 학원·교재·앱을 한 번에 묶어 추천해 드려요."
                    action={
                        <div className="flex flex-col gap-2 sm:flex-row">
                            <SegmentedControl dark label="지역" options={REGIONS} value={region} onChange={setRegion} />
                            <SegmentedControl dark label="과목" options={SUBJECTS} value={subject} onChange={setSubject} />
                        </div>
                    }
                />

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr_1fr]">
                    <article className="rounded-3xl bg-paper p-6 text-ink md:p-7">
                        <div className="flex items-center justify-between">
                            <span className="rounded-full bg-terracotta px-3 py-1 text-xs font-bold text-white">추천 학원</span>
                            <span className="inline-flex items-center gap-1 text-sm font-bold">
                                <Star className="h-4 w-4 fill-[#e0a43a] text-[#e0a43a]" /> {academy.rating}
                                <span className="font-normal text-ink/45">({academy.reviews})</span>
                            </span>
                        </div>
                        <h3 className="mt-5 text-2xl font-black tracking-tight">{academy.name}</h3>
                        <p className="mt-1 inline-flex items-center gap-1 text-sm text-ink/55">
                            <MapPin className="h-3.5 w-3.5" /> {academy.district}
                        </p>
                        <p className="mt-4 text-[15px] leading-relaxed">{academy.description}</p>
                        <div className="mt-6 flex flex-wrap gap-2">
                            <a href={academy.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-paper">
                                지도에서 보기 <ArrowUpRight className="h-4 w-4" />
                            </a>
                            <Link href="/community" className="rounded-full border border-ink/15 px-4 py-2.5 text-sm font-semibold hover:bg-ink/5">
                                후기 {academy.reviews}개 읽기
                            </Link>
                        </div>
                        <div className="mt-6 border-t border-ink/10 pt-4">
                            <p className="text-xs font-semibold text-ink/45">{region}의 다른 학원</p>
                            <ul className="mt-2 space-y-1.5">
                                {others.map((item) => (
                                    <li key={item.name}>
                                        <a href={item.mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-sm hover:text-terracotta">
                                            <span>{item.name} <span className="text-ink/45">· {item.subject}</span></span>
                                            <span className="text-xs text-ink/55">★ {item.rating}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </article>

                    {book && (
                        <article className="flex flex-col rounded-3xl bg-white/[0.06] p-6 ring-1 ring-white/10">
                            <span className="self-start rounded-full bg-white/10 px-3 py-1 text-xs font-bold">함께 보면 좋은 교재</span>
                            <div className="mt-6 flex justify-center">
                                <Image src={book.cover} alt={`${book.title} 표지`} width={112} height={160} className="-rotate-3 rounded-lg shadow-2xl" />
                            </div>
                            <h3 className="mt-6 text-lg font-bold">{book.title}</h3>
                            <p className="mt-1 text-sm leading-relaxed text-paper/60">{book.level} · {book.description}</p>
                            <a href={book.kyoboUrl} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-butter">
                                교보문고에서 보기 <ArrowUpRight className="h-4 w-4" />
                            </a>
                        </article>
                    )}

                    {app && (
                        <article className="flex flex-col rounded-3xl bg-white/[0.06] p-6 ring-1 ring-white/10">
                            <span className="self-start rounded-full bg-white/10 px-3 py-1 text-xs font-bold">학습 앱</span>
                            <div className="mt-6 flex items-center gap-4">
                                <Image src={app.icon} alt="" width={64} height={64} className="rounded-2xl" />
                                <div>
                                    <h3 className="text-lg font-bold">{app.name}</h3>
                                    <p className="text-sm text-paper/60">{app.description}</p>
                                </div>
                            </div>
                            <div className="mt-6 rounded-2xl bg-white/5 p-4 text-sm leading-relaxed text-paper/75">
                                “매일 15분씩 쓰니 습관이 되더라고요.”
                                <span className="mt-2 block text-xs text-paper/45">커뮤니티 후기 중에서</span>
                            </div>
                            <a href={app.link} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-butter">
                                서비스 바로가기 <ArrowUpRight className="h-4 w-4" />
                            </a>
                        </article>
                    )}
                </div>
            </div>
        </section>
    );
}

function MagazineStrip() {
    return (
        <section className={CONTAINER}>
            <SectionHeading
                kicker="LUMIERE 매거진"
                icon={BookOpen}
                title="전문가가 쓰고, 에디터가 다듬은 이야기"
                action={
                    <Link href="/blog" className="inline-flex items-center gap-1 self-start text-sm font-semibold text-ink/60 hover:text-ink lg:self-auto">
                        전체 보기 <ArrowRight className="h-4 w-4" />
                    </Link>
                }
            />
            <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-4">
                {MAGAZINE_ARTICLES.slice(0, 4).map((article) => (
                    <Link key={article.id} href="/blog" className="group w-[78%] shrink-0 snap-start md:w-auto">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-paper-deep">
                            <Image src={article.image} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                        </div>
                        <p className="mt-4 text-xs font-bold text-terracotta">{article.category}</p>
                        <h3 className="mt-1.5 font-bold leading-snug group-hover:underline group-hover:underline-offset-4">{article.title}</h3>
                        <p className="mt-2 text-xs text-ink/50">{article.author} · {article.readTime}</p>
                    </Link>
                ))}
            </div>
        </section>
    );
}

function JoinBanner() {
    return (
        <section className={CONTAINER}>
            <div className="relative overflow-hidden rounded-[36px] bg-terracotta px-6 py-12 text-white md:px-14 md:py-16">
                <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full border-[48px] border-white/10" />
                <div aria-hidden className="pointer-events-none absolute -bottom-24 right-1/3 h-56 w-56 rounded-full bg-white/10" />
                <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                    <div>
                        <h2 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">
                            질문 하나가 누군가에겐
                            <br className="hidden md:block" /> 꼭 필요한 답이 됩니다.
                        </h2>
                        <p className="mt-4 text-white/80">가입하면 우리 동네·우리 학년 소식을 먼저 받아볼 수 있어요.</p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                        <Link href="/login" className="rounded-full bg-white px-8 py-4 text-center font-bold text-terracotta transition-transform hover:-translate-y-0.5">
                            무료로 시작하기
                        </Link>
                        <Link href="/community" className="rounded-full border border-white/40 px-8 py-4 text-center font-semibold transition-colors hover:bg-white/10">
                            먼저 둘러보기
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

function HubFooter() {
    return (
        <footer className={cn(CONTAINER, "mt-20 pb-28 md:pb-12")}>
            <div className="flex flex-col gap-6 border-t border-ink/10 pt-8 md:flex-row md:items-center md:justify-between">
                <p className="text-lg font-black">LUMIERE<span className="text-terracotta">.</span></p>
                <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink/60">
                    <Link href="/privacy" className="hover:text-ink">개인정보처리방침</Link>
                    <Link href="/terms" className="hover:text-ink">이용약관</Link>
                    <Link href="/contact" className="hover:text-ink">문의하기</Link>
                </nav>
                <p className="text-xs text-ink/45">© 2026 Lumiere Education</p>
            </div>
        </footer>
    );
}

function MobileTabBar() {
    const items = [
        { label: "홈", href: "/drafts/hub", icon: House, active: true },
        { label: "커뮤니티", href: "/community", icon: MessagesSquare },
        { label: "글쓰기", href: "/community", icon: Plus, primary: true },
        { label: "추천", href: "/recommend", icon: MapPin },
        { label: "MY", href: "/login", icon: User },
    ];

    return (
        <nav aria-label="하단 메뉴" className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-white/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden">
            <ul className="grid grid-cols-5">
                {items.map(({ label, href, icon: Icon, active, primary }) => (
                    <li key={label}>
                        <Link
                            href={href}
                            aria-current={active ? "page" : undefined}
                            className={cn("flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold", active ? "text-ink" : "text-ink/45")}
                        >
                            {primary ? (
                                <span className="-mt-6 grid h-12 w-12 place-items-center rounded-full bg-terracotta text-white shadow-lg shadow-terracotta/30">
                                    <Icon className="h-5 w-5" />
                                </span>
                            ) : (
                                <Icon className="h-5 w-5" />
                            )}
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
