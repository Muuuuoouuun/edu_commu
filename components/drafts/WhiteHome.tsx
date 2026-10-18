"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    AnimatePresence,
    MotionConfig,
    animate,
    motion,
    useInView,
    useMotionValueEvent,
    useReducedMotion,
    useScroll,
} from "framer-motion";
import {
    ArrowRight,
    ArrowUpRight,
    BookOpen,
    Check,
    GraduationCap,
    Heart,
    MapPin,
    MessageCircle,
    PenLine,
    Search,
    Sparkles,
    Star,
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
    TOPICS,
    type CommunityThread,
    type Region,
    type Subject,
    type ThreadType,
} from "@/lib/home-content";

// 시안 C — White Premium: 흰 바탕과 넓은 여백, 절제된 타이포에 작고 아기자기한 모션을 더한 레이아웃

const CONTAINER = "mx-auto w-full max-w-6xl px-6 md:px-10";
const EASE = [0.22, 1, 0.36, 1] as const;

const TYPE_TONE: Record<ThreadType, string> = {
    질문: "bg-blush text-terracotta",
    후기: "bg-sage text-forest",
    토론: "bg-lilac text-plum",
};

const STICKERS = [
    { icon: BookOpen, tone: "bg-butter text-[#866419]", position: "left-[2%] top-[22%]", rotate: -8, delay: 0.6 },
    { icon: PenLine, tone: "bg-blush text-terracotta", position: "right-[3%] top-[14%]", rotate: 10, delay: 0.75 },
    { icon: MessageCircle, tone: "bg-sage text-forest", position: "left-[9%] bottom-[20%]", rotate: 6, delay: 0.9 },
    { icon: Star, tone: "bg-lilac text-plum", position: "right-[8%] bottom-[26%]", rotate: -12, delay: 1.05 },
    { icon: GraduationCap, tone: "bg-mist text-[#3d5566]", position: "left-[20%] top-[6%]", rotate: 4, delay: 1.2, small: true },
];

const STATS = [
    { value: 1284, suffix: "", label: "이번 주 새 질문" },
    { value: 18, suffix: "분", label: "첫 답변까지 평균" },
    { value: 340, suffix: "명", label: "활동 중인 인증 멘토" },
];

export function WhiteHome() {
    return (
        <MotionConfig reducedMotion="user">
            <div className="min-h-screen bg-white text-ink">
                <WhiteHeader />
                <main>
                    <Hero />
                    <Stats />
                    <EditorPicks />
                    <KeywordMarquee />
                    <Community />
                    <LocalPicks />
                    <Newsletter />
                </main>
                <WhiteFooter />
            </div>
        </MotionConfig>
    );
}

function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: EASE, delay }}
        >
            {children}
        </motion.div>
    );
}

function SectionTitle({ eyebrow, title, description, action, center }: {
    eyebrow: string;
    title: React.ReactNode;
    description?: string;
    action?: React.ReactNode;
    center?: boolean;
}) {
    return (
        <Reveal className={cn("mb-14 flex flex-col gap-6 md:mb-20", center ? "items-center text-center" : "md:flex-row md:items-end md:justify-between")}>
            <div className={center ? "max-w-2xl" : "max-w-xl"}>
                <p className="text-sm font-medium text-terracotta">{eyebrow}</p>
                <h2 className="mt-3 text-3xl font-semibold leading-[1.2] tracking-[-0.03em] md:text-5xl">{title}</h2>
                {description && <p className="mt-5 text-base leading-relaxed text-ink/50 md:text-lg">{description}</p>}
            </div>
            {action}
        </Reveal>
    );
}

function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link href={href} className="group inline-flex items-center gap-2 self-start text-sm font-medium text-ink/60 transition-colors hover:text-ink md:self-auto">
            {children}
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[#f4f4f2] transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="h-3.5 w-3.5" />
            </span>
        </Link>
    );
}

function WhiteHeader() {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);
    useMotionValueEvent(scrollY, "change", (value) => setScrolled(value > 12));

    return (
        <header
            className={cn(
                "sticky top-0 z-50 transition-[background-color,box-shadow] duration-500",
                scrolled ? "bg-white/80 shadow-[0_1px_0_rgba(17,17,17,0.06)] backdrop-blur-xl" : "bg-white"
            )}
        >
            <div className={cn(CONTAINER, "flex h-16 items-center justify-between md:h-20")}>
                <Link href="/drafts/white" className="flex items-baseline text-lg font-semibold tracking-[-0.02em]">
                    LUMIERE
                    <motion.span
                        className="ml-0.5 inline-block h-1.5 w-1.5 rounded-full bg-terracotta"
                        initial={{ y: -14, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 12, delay: 0.4 }}
                    />
                </Link>
                <nav className="hidden items-center gap-9 text-sm text-ink/60 md:flex">
                    {NAV_LINKS.map((link) => (
                        <Link key={link.href} href={link.href} className="group relative py-1 transition-colors hover:text-ink">
                            {link.label}
                            <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-ink transition-transform duration-300 group-hover:scale-x-100" />
                        </Link>
                    ))}
                </nav>
                <div className="flex items-center gap-1.5">
                    <button aria-label="검색" className="grid h-10 w-10 place-items-center rounded-full text-ink/60 transition-colors hover:bg-[#f4f4f2] hover:text-ink">
                        <Search className="h-[18px] w-[18px]" />
                    </button>
                    <Link href="/login" className="hidden px-3 text-sm text-ink/60 transition-colors hover:text-ink sm:block">로그인</Link>
                    <Link href="/login" className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-[1.03] active:scale-[0.98]">
                        시작하기
                    </Link>
                </div>
            </div>
        </header>
    );
}

function Sticker({ icon: Icon, tone, position, rotate, delay, small }: (typeof STICKERS)[number]) {
    return (
        <motion.div
            aria-hidden
            className={cn(
                "absolute hidden place-items-center rounded-2xl shadow-[0_14px_30px_-14px_rgba(17,17,17,0.3)] lg:grid",
                small ? "h-11 w-11" : "h-14 w-14",
                tone,
                position
            )}
            initial={{ opacity: 0, scale: 0.4, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate, y: [0, -10, 0] }}
            whileHover={{ scale: 1.15, rotate: -rotate }}
            transition={{
                opacity: { delay, duration: 0.4 },
                scale: { delay, type: "spring", stiffness: 320, damping: 12 },
                rotate: { delay, type: "spring", stiffness: 220, damping: 10 },
                y: { delay: delay + 0.5, duration: 3.4 + delay, repeat: Infinity, ease: "easeInOut" },
            }}
        >
            <Icon className={small ? "h-5 w-5" : "h-6 w-6"} />
        </motion.div>
    );
}

function AnimatedLine({ text, delay, className }: { text: string; delay: number; className?: string }) {
    return (
        <span className={cn("block", className)}>
            {text.split(" ").map((word, index) => (
                <span key={`${word}-${index}`}>
                    <span className="inline-block overflow-hidden pb-[0.1em] align-top">
                        <motion.span
                            className="inline-block"
                            initial={{ y: "110%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.9, ease: EASE, delay: delay + index * 0.08 }}
                        >
                            {word}
                        </motion.span>
                    </span>{" "}
                </span>
            ))}
        </span>
    );
}

function Hero() {
    return (
        <section className="relative overflow-hidden">
            <div className={cn(CONTAINER, "relative pb-24 pt-16 text-center md:pb-36 md:pt-28")}>
                {STICKERS.map((sticker) => (
                    <Sticker key={sticker.position} {...sticker} />
                ))}

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="inline-flex items-center gap-2 rounded-full border border-ink/10 px-4 py-1.5 text-xs font-medium text-ink/60"
                >
                    <motion.span className="inline-flex" animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}>
                        <Sparkles className="h-3.5 w-3.5 text-terracotta" />
                    </motion.span>
                    2026 가을, 새로워진 루미에르
                </motion.p>

                <h1 className="mx-auto mt-8 max-w-4xl text-[2.5rem] font-semibold leading-[1.15] tracking-[-0.04em] md:text-6xl">
                    <AnimatedLine text="배움이 머무는 곳," delay={0.1} />
                    <AnimatedLine text="우리 아이 공부의 모든 이야기." delay={0.35} className="text-ink/50" />
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
                    className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-ink/50 md:text-lg"
                >
                    매거진, 커뮤니티, 학원·교재 추천까지. 꼭 필요한 것만 조용히 담았습니다.
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.85 }}>
                    <HeroSearch />
                </motion.div>

                <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {POPULAR_KEYWORDS.map((keyword, index) => (
                        <motion.button
                            key={keyword}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -2 }}
                            transition={{ duration: 0.5, ease: EASE, delay: 1 + index * 0.06 }}
                            className="rounded-full bg-[#f6f6f4] px-3.5 py-1.5 text-sm text-ink/60 transition-colors hover:bg-[#efefec] hover:text-ink"
                        >
                            #{keyword}
                        </motion.button>
                    ))}
                </div>
            </div>

            <div aria-hidden className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block">
                <div className="flex h-9 w-6 justify-center rounded-full border border-ink/15 pt-2">
                    <motion.span
                        className="h-1.5 w-1 rounded-full bg-ink/40"
                        animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>
            </div>
        </section>
    );
}

function HeroSearch() {
    const [query, setQuery] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setIndex((value) => (value + 1) % POPULAR_KEYWORDS.length), 2800);
        return () => clearInterval(timer);
    }, []);

    return (
        <form
            role="search"
            onSubmit={(event) => event.preventDefault()}
            className="mx-auto mt-12 flex max-w-xl items-center gap-2 rounded-full border border-ink/10 bg-white p-1.5 pl-5 shadow-[0_20px_50px_-24px_rgba(17,17,17,0.22)] transition-shadow duration-300 focus-within:shadow-[0_24px_60px_-20px_rgba(17,17,17,0.3)]"
        >
            <Search className="h-[18px] w-[18px] shrink-0 text-ink/40" />
            <div className="relative h-11 flex-1 overflow-hidden text-left">
                <input
                    aria-label="검색어"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    className="h-full w-full bg-transparent text-[15px] outline-none"
                />
                {!query && (
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                            key={index}
                            aria-hidden
                            className="pointer-events-none absolute inset-y-0 left-0 flex items-center truncate text-[15px] text-ink/40"
                            initial={{ y: 16, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -16, opacity: 0 }}
                            transition={{ duration: 0.35, ease: EASE }}
                        >
                            ‘{POPULAR_KEYWORDS[index]}’ 검색해 보세요
                        </motion.span>
                    </AnimatePresence>
                )}
            </div>
            <motion.button type="submit" whileTap={{ scale: 0.94 }} className="h-11 shrink-0 rounded-full bg-ink px-6 text-sm font-medium text-white">
                검색
            </motion.button>
        </form>
    );
}

function CountUp({ to }: { to: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });
    const reduceMotion = useReducedMotion();
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!inView) return;
        const controls = animate(0, to, {
            duration: reduceMotion ? 0 : 1.6,
            ease: EASE,
            onUpdate: (latest) => setValue(Math.round(latest)),
        });
        return () => controls.stop();
    }, [inView, to, reduceMotion]);

    return <span ref={ref} className="tabular-nums">{value.toLocaleString("ko-KR")}</span>;
}

function Stats() {
    return (
        <section className={CONTAINER} aria-label="커뮤니티 지표">
            <div className="grid grid-cols-3 divide-x divide-ink/[0.06] border-y border-ink/[0.06]">
                {STATS.map((stat, index) => (
                    <Reveal key={stat.label} delay={index * 0.1} className="px-2 py-9 text-center md:px-6 md:py-12">
                        <p className="text-[1.75rem] font-semibold tracking-[-0.03em] md:text-5xl">
                            <CountUp to={stat.value} />
                            {stat.suffix}
                        </p>
                        <p className="mt-2 text-xs text-ink/50 md:text-sm">{stat.label}</p>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}

function EditorPicks() {
    const [lead, ...rest] = MAGAZINE_ARTICLES;

    return (
        <section className={cn(CONTAINER, "py-28 md:py-40")}>
            <SectionTitle
                eyebrow="에디터 픽"
                title={<>이번 주, 천천히<br />읽어볼 이야기</>}
                action={<ArrowLink href="/blog">매거진 전체 보기</ArrowLink>}
            />
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
                <Reveal className="lg:col-span-7">
                    <Link href="/blog" className="group block">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] bg-[#f6f6f4]">
                            <Image src={lead.image} alt="" fill className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]" />
                        </div>
                        <p className="mt-7 text-sm text-ink/45">{lead.category} · {lead.readTime} 읽기</p>
                        <h3 className="mt-3 text-2xl font-semibold leading-snug tracking-[-0.02em] md:text-[2rem]">{lead.title}</h3>
                        <p className="mt-4 max-w-xl leading-relaxed text-ink/55">{lead.excerpt}</p>
                    </Link>
                </Reveal>
                <div className="flex flex-col gap-10 lg:col-span-5 lg:justify-center">
                    {rest.slice(0, 3).map((article, index) => (
                        <Reveal key={article.id} delay={0.1 + index * 0.1}>
                            <Link href="/blog" className="group grid grid-cols-[7rem_1fr] items-center gap-6 md:grid-cols-[8.5rem_1fr]">
                                <div className="relative aspect-square overflow-hidden rounded-[24px] bg-[#f6f6f4]">
                                    <Image src={article.image} alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
                                </div>
                                <div>
                                    <p className="text-xs text-ink/45">{article.category}</p>
                                    <h3 className="mt-2 font-semibold leading-snug tracking-[-0.01em] transition-colors group-hover:text-ink/70 md:text-lg">{article.title}</h3>
                                    <p className="mt-2 text-xs text-ink/40">{article.author} · {article.readTime}</p>
                                </div>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

function KeywordMarquee() {
    const items = [...POPULAR_KEYWORDS, ...TOPICS.map((topic) => topic.name), "자기주도학습", "독서 습관", "진로 탐색"];

    return (
        <section aria-label="인기 키워드" className="overflow-hidden border-y border-ink/[0.06] py-7">
            <div className="flex w-max motion-safe:animate-marquee hover:[animation-play-state:paused]">
                {[0, 1].map((copy) => (
                    <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
                        {items.map((item) => (
                            <li key={item} className="flex items-center whitespace-nowrap text-xl tracking-[-0.02em] text-ink/30 md:text-2xl">
                                <span className="px-6 transition-colors hover:text-ink">{item}</span>
                                <Sparkles aria-hidden className="h-4 w-4 text-terracotta/40" />
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
        </section>
    );
}

function Burst() {
    return (
        <span aria-hidden className="pointer-events-none absolute inset-0">
            {Array.from({ length: 6 }, (_, index) => {
                const angle = (index / 6) * Math.PI * 2;
                return (
                    <motion.span
                        key={index}
                        className="absolute left-1/2 top-1/2 -ml-0.5 -mt-0.5 h-1 w-1 rounded-full bg-terracotta"
                        initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                        animate={{ x: Math.cos(angle) * 14, y: Math.sin(angle) * 14, opacity: 0, scale: 0.4 }}
                        transition={{ duration: 0.55, ease: EASE }}
                    />
                );
            })}
        </span>
    );
}

function LikeButton({ count }: { count: number }) {
    const [liked, setLiked] = useState(false);
    const [bursts, setBursts] = useState(0);

    return (
        <button
            type="button"
            aria-pressed={liked}
            aria-label="좋아요"
            onClick={() => {
                if (!liked) setBursts((value) => value + 1);
                setLiked((value) => !value);
            }}
            className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs transition-colors hover:bg-ink/[0.04]", liked && "text-terracotta")}
        >
            <span className="relative grid place-items-center">
                <motion.span
                    key={liked ? "on" : "off"}
                    className="inline-flex"
                    initial={{ scale: liked ? 0.3 : 1 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 600, damping: 12 }}
                >
                    <Heart className={cn("h-4 w-4", liked && "fill-current")} />
                </motion.span>
                {liked && bursts > 0 && <Burst key={bursts} />}
            </span>
            <span className="tabular-nums">{count + (liked ? 1 : 0)}</span>
        </button>
    );
}

function WaitingBadge() {
    return (
        <span className="inline-flex items-center gap-2 rounded-full bg-butter/70 px-3 py-1.5 text-xs font-medium text-[#7a5d14]">
            <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#d4a72c] opacity-70 motion-safe:animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#d4a72c]" />
            </span>
            첫 답변을 기다려요
        </span>
    );
}

function ThreadItem({ thread }: { thread: CommunityThread }) {
    return (
        <motion.article
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="rounded-[28px] bg-white p-7 ring-1 ring-ink/[0.05] transition-shadow duration-300 hover:shadow-[0_24px_50px_-24px_rgba(17,17,17,0.2)]"
        >
            <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className={cn("rounded-full px-2.5 py-1 font-medium", TYPE_TONE[thread.type])}>{thread.type}</span>
                <span className="text-ink/40">{thread.role} · {thread.region} · {thread.time}</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold leading-snug tracking-[-0.01em]">
                <Link href="/community" className="decoration-ink/20 underline-offset-4 hover:underline">{thread.title}</Link>
            </h3>
            <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-ink/50">{thread.excerpt}</p>
            <div className="mt-5 flex items-center justify-between gap-3">
                <div className="-ml-2.5 flex items-center text-ink/50">
                    <LikeButton count={thread.likes} />
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs">
                        <MessageCircle className="h-4 w-4" />
                        {thread.comments}
                    </span>
                </div>
                {!thread.answered && <WaitingBadge />}
            </div>
        </motion.article>
    );
}

function TypingDots() {
    return (
        <span className="inline-flex items-center gap-1">
            {[0, 1, 2].map((dot) => (
                <motion.span
                    key={dot}
                    className="h-1.5 w-1.5 rounded-full bg-ink/40"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: dot * 0.15 }}
                />
            ))}
        </span>
    );
}

function ChatBubbles() {
    const float = (duration: number, delay = 0) => ({
        animate: { y: [0, -6, 0] },
        transition: { duration, repeat: Infinity, ease: "easeInOut" as const, delay },
    });

    return (
        <div aria-hidden className="relative mt-16 hidden h-44 lg:block">
            <motion.div {...float(4)} className="absolute left-0 top-0 rounded-[22px] rounded-bl-md bg-white px-5 py-3.5 text-sm shadow-[0_14px_30px_-18px_rgba(17,17,17,0.35)] ring-1 ring-ink/5">
                중2 수학, 선행이 먼저일까요?
            </motion.div>
            <motion.div {...float(4.6, 0.4)} className="absolute right-4 top-14 rounded-[22px] rounded-br-md bg-ink px-5 py-3.5 text-sm text-white shadow-[0_14px_30px_-18px_rgba(17,17,17,0.5)]">
                개념 연결부터 확인해 보세요!
            </motion.div>
            <motion.div {...float(5, 0.8)} className="absolute left-10 top-[7.5rem] rounded-[22px] rounded-bl-md bg-white px-5 py-4 shadow-[0_14px_30px_-18px_rgba(17,17,17,0.35)] ring-1 ring-ink/5">
                <TypingDots />
            </motion.div>
        </div>
    );
}

function Community() {
    return (
        <section className="bg-[#fafaf9] py-28 md:py-40">
            <div className={cn(CONTAINER, "grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16")}>
                <div className="lg:col-span-5">
                    <div className="lg:sticky lg:top-32">
                        <Reveal>
                            <p className="text-sm font-medium text-terracotta">커뮤니티</p>
                            <h2 className="mt-3 text-3xl font-semibold leading-[1.2] tracking-[-0.03em] md:text-5xl">
                                혼자 고민하지
                                <br />
                                않아도 괜찮아요.
                            </h2>
                            <p className="mt-5 max-w-sm text-base leading-relaxed text-ink/50 md:text-lg">
                                같은 동네, 같은 학년의 학부모와 선배들이 직접 겪은 이야기를 나눕니다.
                            </p>
                            <div className="mt-10 flex flex-wrap items-center gap-5">
                                <Link href="/community" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.03] active:scale-[0.98]">
                                    <PenLine className="h-4 w-4" /> 질문하기
                                </Link>
                                <ArrowLink href="/community">전체 이야기</ArrowLink>
                            </div>
                        </Reveal>
                        <ChatBubbles />
                    </div>
                </div>
                <div className="space-y-4 lg:col-span-7">
                    {COMMUNITY_THREADS.slice(0, 5).map((thread, index) => (
                        <Reveal key={thread.id} delay={index * 0.06}>
                            <ThreadItem thread={thread} />
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

function PillTabs<T extends string>({ id, label, options, value, onChange }: {
    id: string;
    label: string;
    options: readonly T[];
    value: T;
    onChange: (value: T) => void;
}) {
    return (
        <div role="radiogroup" aria-label={label} className="inline-flex rounded-full bg-[#f4f4f2] p-1">
            {options.map((option) => (
                <button key={option} role="radio" aria-checked={value === option} onClick={() => onChange(option)} className="relative rounded-full px-5 py-2 text-sm font-medium">
                    {value === option && (
                        <motion.span
                            layoutId={`${id}-pill`}
                            className="absolute inset-0 rounded-full bg-white shadow-[0_2px_8px_rgba(17,17,17,0.08)]"
                            transition={{ type: "spring", stiffness: 420, damping: 32 }}
                        />
                    )}
                    <span className={cn("relative transition-colors", value === option ? "text-ink" : "text-ink/50 hover:text-ink/80")}>{option}</span>
                </button>
            ))}
        </div>
    );
}

function PickCard({ label, icon: Icon, swapKey, children }: { label: string; icon: React.ElementType; swapKey: string; children: React.ReactNode }) {
    return (
        <motion.article
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="flex flex-col rounded-[28px] bg-[#fafaf9] p-8 transition-shadow duration-300 hover:shadow-[0_24px_50px_-28px_rgba(17,17,17,0.25)]"
        >
            <p className="inline-flex items-center gap-1.5 text-xs font-medium text-ink/45">
                <Icon className="h-3.5 w-3.5" /> {label}
            </p>
            <motion.div
                key={swapKey}
                className="flex flex-1 flex-col"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
            >
                {children}
            </motion.div>
        </motion.article>
    );
}

function LocalPicks() {
    const [region, setRegion] = useState<Region>("목동");
    const [subject, setSubject] = useState<Subject>("수학");
    const academy = ACADEMIES.find((item) => item.region === region && item.subject === subject) ?? ACADEMIES[0];
    const book = BOOKS.find((item) => item.subject === subject) ?? BOOKS[0];
    const app = LEARNING_APPS.find((item) => item.subject === subject) ?? LEARNING_APPS[0];
    const swapKey = `${region}-${subject}`;

    return (
        <section className={cn(CONTAINER, "py-28 md:py-40")}>
            <SectionTitle center eyebrow="우리 동네 추천" title="지역과 과목만 고르세요." description="학원, 교재, 학습 앱을 한 번에 묶어 추천해 드립니다." />
            <Reveal className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <PillTabs id="region" label="지역" options={REGIONS} value={region} onChange={setRegion} />
                <PillTabs id="subject" label="과목" options={SUBJECTS} value={subject} onChange={setSubject} />
            </Reveal>

            <Reveal className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3" delay={0.1}>
                <PickCard label="학원" icon={MapPin} swapKey={swapKey}>
                    <h3 className="mt-8 text-xl font-semibold tracking-[-0.02em]">{academy.name}</h3>
                    <p className="mt-1 text-sm text-ink/45">{academy.district}</p>
                    <p className="mt-5 text-[15px] leading-relaxed text-ink/60">{academy.description}</p>
                    <div className="mt-auto flex items-center justify-between pt-8 text-sm">
                        <span className="inline-flex items-center gap-1 font-medium">
                            <Star className="h-4 w-4 fill-[#e0a43a] text-[#e0a43a]" /> {academy.rating}
                            <span className="font-normal text-ink/40">· 후기 {academy.reviews}</span>
                        </span>
                        <a href={academy.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-ink/60 hover:text-ink">
                            지도 <ArrowUpRight className="h-4 w-4" />
                        </a>
                    </div>
                </PickCard>

                <PickCard label="교재" icon={BookOpen} swapKey={swapKey}>
                    <motion.div whileHover={{ rotate: -4, y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 14 }} className="mt-8 self-start">
                        <Image src={book.cover} alt={`${book.title} 표지`} width={84} height={120} className="rounded-lg shadow-[0_16px_30px_-14px_rgba(17,17,17,0.35)]" />
                    </motion.div>
                    <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em]">{book.title}</h3>
                    <p className="mt-1 text-sm text-ink/45">{book.level} · {book.description}</p>
                    <a href={book.kyoboUrl} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-1 pt-8 text-sm font-medium text-ink/60 hover:text-ink">
                        교보문고에서 보기 <ArrowUpRight className="h-4 w-4" />
                    </a>
                </PickCard>

                <PickCard label="학습 앱" icon={Sparkles} swapKey={swapKey}>
                    <motion.div whileHover={{ scale: 1.08, rotate: 6 }} transition={{ type: "spring", stiffness: 400, damping: 10 }} className="mt-8 self-start">
                        <Image src={app.icon} alt="" width={64} height={64} className="rounded-2xl shadow-[0_12px_24px_-12px_rgba(17,17,17,0.3)]" />
                    </motion.div>
                    <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em]">{app.name}</h3>
                    <p className="mt-1 text-sm text-ink/45">{app.description}</p>
                    <a href={app.link} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-1 pt-8 text-sm font-medium text-ink/60 hover:text-ink">
                        서비스 바로가기 <ArrowUpRight className="h-4 w-4" />
                    </a>
                </PickCard>
            </Reveal>
        </section>
    );
}

function Newsletter() {
    const [subscribed, setSubscribed] = useState(false);

    return (
        <section className={cn(CONTAINER, "pb-28 md:pb-40")}>
            <Reveal className="relative overflow-hidden rounded-[40px] bg-[#fafaf9] px-6 py-20 text-center md:py-28">
                <motion.span
                    aria-hidden
                    className="absolute left-[8%] top-[18%] hidden h-10 w-10 place-items-center rounded-xl bg-butter text-[#866419] md:grid"
                    animate={{ y: [0, -8, 0], rotate: [-6, 4, -6] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <BookOpen className="h-5 w-5" />
                </motion.span>
                <motion.span
                    aria-hidden
                    className="absolute bottom-[20%] right-[9%] hidden h-12 w-12 place-items-center rounded-2xl bg-blush text-terracotta md:grid"
                    animate={{ y: [0, 8, 0], rotate: [8, -4, 8] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Heart className="h-5 w-5" />
                </motion.span>

                <p className="text-sm font-medium text-terracotta">뉴스레터</p>
                <h2 className="mt-3 text-3xl font-semibold leading-[1.2] tracking-[-0.03em] md:text-5xl">
                    매주 일요일 아침,
                    <br />
                    교육 편지 한 통.
                </h2>
                <p className="mx-auto mt-5 max-w-md text-ink/50">가장 많이 읽힌 글과 놓치면 아쉬운 대화만 골라 보내드려요.</p>

                <AnimatePresence mode="wait" initial={false}>
                    {subscribed ? (
                        <motion.div
                            key="done"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mx-auto mt-10 inline-flex items-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-medium ring-1 ring-ink/5"
                        >
                            <motion.span
                                initial={{ scale: 0, rotate: -90 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 400, damping: 12, delay: 0.1 }}
                                className="grid h-7 w-7 place-items-center rounded-full bg-forest text-white"
                            >
                                <Check className="h-4 w-4" />
                            </motion.span>
                            구독해 주셔서 고마워요!
                        </motion.div>
                    ) : (
                        <motion.form
                            key="form"
                            exit={{ opacity: 0, y: -8 }}
                            onSubmit={(event) => {
                                event.preventDefault();
                                setSubscribed(true);
                            }}
                            className="mx-auto mt-10 flex max-w-md items-center gap-2 rounded-full bg-white p-1.5 pl-5 ring-1 ring-ink/[0.06]"
                        >
                            <label htmlFor="white-newsletter-email" className="sr-only">이메일</label>
                            <input
                                id="white-newsletter-email"
                                type="email"
                                required
                                placeholder="이메일 주소"
                                className="h-11 min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-ink/40"
                            />
                            <motion.button type="submit" whileTap={{ scale: 0.94 }} className="h-11 shrink-0 rounded-full bg-ink px-6 text-sm font-medium text-white">
                                구독하기
                            </motion.button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </Reveal>
        </section>
    );
}

function WhiteFooter() {
    const links = [
        ...NAV_LINKS,
        { label: "개인정보처리방침", href: "/privacy" },
        { label: "이용약관", href: "/terms" },
        { label: "문의하기", href: "/contact" },
    ];

    return (
        <footer className="border-t border-ink/[0.06]">
            <div className={cn(CONTAINER, "flex flex-col gap-10 py-16 md:flex-row md:justify-between")}>
                <div>
                    <p className="text-lg font-semibold tracking-[-0.02em]">
                        LUMIERE<span className="text-terracotta">.</span>
                    </p>
                    <p className="mt-3 text-sm text-ink/45">배움이 머무는 곳</p>
                </div>
                <ul className="grid grid-cols-2 gap-x-14 gap-y-3 text-sm text-ink/55 sm:grid-cols-3">
                    {links.map((link) => (
                        <li key={link.href}>
                            <Link href={link.href} className="transition-colors hover:text-ink">{link.label}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <p className={cn(CONTAINER, "pb-12 text-xs text-ink/40")}>© 2026 Lumiere Education. All rights reserved.</p>
        </footer>
    );
}
