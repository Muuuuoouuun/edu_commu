"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Video, FileText, Mic } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CURATED_RESOURCES = [
    {
        id: 1,
        title: "The Future of Generative AI in Education",
        category: "Deep Dive",
        type: "Article",
        author: "Dr. Sarah Kim",
        readTime: "12 min read",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop",
        link: "#"
    },
    {
        id: 2,
        title: "Modern UI/UX Principles for 2025",
        category: "Design System",
        type: "Video Course",
        author: "Lumiere Design Team",
        readTime: "45 min watch",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2574&auto=format&fit=crop",
        link: "#"
    },
    {
        id: 3,
        title: "Sustainable Architecture: A Case Study",
        category: "Environment",
        type: "Case Study",
        author: "James Chen",
        readTime: "20 min read",
        image: "https://images.unsplash.com/photo-1518005020951-ecc8e54333b0?q=80&w=2574&auto=format&fit=crop",
        link: "#"
    },
    {
        id: 4,
        title: "Understanding Quantum Computing",
        category: "Technology",
        type: "Podcast",
        author: "Tech Frontiers",
        readTime: "30 min listen",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2670&auto=format&fit=crop",
        link: "#"
    },
    {
        id: 5,
        title: "Mastering TypeScript Generics",
        category: "Engineering",
        type: "Guide",
        author: "Code Masters",
        readTime: "15 min read",
        image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2531&auto=format&fit=crop",
        link: "#"
    },
    {
        id: 6,
        title: "The Psychology of Learning",
        category: "Education",
        type: "Paper",
        author: "Research Lab",
        readTime: "25 min read",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2522&auto=format&fit=crop",
        link: "#"
    }
];

export default function CuratedPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="pt-32 pb-20 container mx-auto px-4 md:px-6">
                <div className="max-w-3xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-serif font-medium text-foreground mb-6"
                    >
                        엄선된 지식,<br />
                        <span className="italic text-accent-gold">깊이 있는 통찰.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-muted leading-relaxed"
                    >
                        LUMIERE 에디터들이 직접 큐레이션한 프리미엄 콘텐츠를 만나보세요.<br />
                        업계 전문가들의 시각과 심도 있는 분석을 제공합니다.
                    </motion.p>
                </div>
            </section>

            {/* Filter / Categories (Visual Only for MVP) */}
            <section className="border-y border-border sticky top-16 bg-background/80 backdrop-blur-md z-40">
                <div className="container mx-auto px-4 md:px-6 py-4 flex items-center gap-8 overflow-x-auto hide-scrollbar text-sm font-medium text-muted">
                    <button className="text-foreground border-b-2 border-foreground pb-1">전체</button>
                    <button className="hover:text-foreground transition-colors pb-1">테크 & 엔지니어링</button>
                    <button className="hover:text-foreground transition-colors pb-1">디자인 & 아트</button>
                    <button className="hover:text-foreground transition-colors pb-1">비즈니스</button>
                    <button className="hover:text-foreground transition-colors pb-1">인문학</button>
                </div>
            </section>

            {/* Resources Grid */}
            <section className="py-20 container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {CURATED_RESOURCES.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted mb-6">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-widest text-black">
                                        {item.type}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-accent-gold">
                                    <span>{item.category}</span>
                                    <span>{item.readTime}</span>
                                </div>
                                <h3 className="text-2xl font-serif font-medium text-foreground leading-tight group-hover:underline decoration-1 underline-offset-4">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-muted mt-1">by {item.author}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="py-20 border-t border-border">
                <div className="container mx-auto px-4 md:px-6 text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl font-serif font-medium mb-4">매주 도착하는 영감</h2>
                    <p className="text-muted mb-8">최고의 아티클과 인사이트를 놓치지 마세요. 뉴스레터를 구독하세요.</p>
                    <div className="flex gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="이메일 주소"
                            className="flex-1 bg-transparent border-b border-border py-2 px-4 outline-none focus:border-foreground transition-colors"
                        />
                        <button className="text-sm font-bold uppercase tracking-widest hover:text-accent-gold transition-colors">
                            구독하기
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
