"use client";

import { useState, useEffect } from "react";
import { CommunityCard } from "@/components/ui/CommunityCard";
import { motion, AnimatePresence } from "framer-motion";
import { AdSlot } from "@/components/ui/AdSlot";
import { CreatePostModal } from "@/components/community/CreatePostModal";
import { PenSquare } from "lucide-react";
import type { Post } from "@/lib/types";

const TABS = ["All", "Questions", "Reviews"];

export function CommunitySection() {
    const [activeTab, setActiveTab] = useState("All");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/posts');
            if (res.ok) {
                const data = await res.json();
                setPosts(data);
            }
        } catch (error) {
            console.error("Failed to fetch posts", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handlePostCreated = () => {
        fetchPosts();
        setIsModalOpen(false);
    };

    const filteredPosts = activeTab === "All"
        ? posts
        : posts.filter(post => post.type === activeTab.toLowerCase().slice(0, -1));

    return (
        <section className="py-20 bg-background border-t border-border">
            <CreatePostModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handlePostCreated}
            />

            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-4">커뮤니티: 자유로운 대화</h2>
                        <p className="text-muted max-w-xl text-lg">질문, 후기, 학습 고민까지 편하게 나누는 열린 토론 공간입니다.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-all"
                        >
                            <PenSquare className="w-4 h-4" />
                            <span>글쓰기</span>
                        </button>

                        <div className="flex p-1 bg-muted/20 rounded-full">
                            {TABS.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className="relative px-6 py-2 rounded-full text-sm font-medium transition-colors"
                                >
                                    {activeTab === tab && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-white shadow-sm rounded-full"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className={activeTab === tab ? "relative z-10 text-foreground" : "relative z-10 text-muted-foreground hover:text-foreground"}>
                                        {tab}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        {isLoading ? (
                            <div className="text-center py-20 text-muted">Loading community...</div>
                        ) : (
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6"
                                >
                                    {filteredPosts.map((post, idx) => (
                                        <div key={post.id}>
                                            <CommunityCard {...post} />
                                            {idx === 1 && (
                                                <div className="my-8 -mx-4 md:-mx-0 overflow-x-auto pb-4 hide-scrollbar">
                                                    <div className="flex gap-4 px-4 md:px-0 w-max">
                                                        {[1, 2, 3].map((card) => (
                                                            <div key={card} className="w-72 p-4 bg-white border border-border rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer group">
                                                                <div className="w-full h-32 bg-secondary/10 rounded-lg mb-3 flex items-center justify-center text-muted">
                                                                    <span className="text-xs font-bold uppercase tracking-widest">Seminar</span>
                                                                </div>
                                                                <h5 className="font-bold text-foreground mb-1 group-hover:text-primary-soft">Design Leadership 101</h5>
                                                                <p className="text-xs text-muted">Starts Oct 30 • Online</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    {filteredPosts.length === 0 && (
                                        <div className="text-center py-20 bg-muted/10 rounded-2xl border border-dashed border-border">
                                            <p className="text-muted mb-2">No posts yet.</p>
                                            <button onClick={() => setIsModalOpen(true)} className="text-foreground font-medium hover:underline">Be the first to share!</button>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        )}
                    </div>

                    <div className="hidden lg:block space-y-8">
                        <div className="sticky top-24">
                            <AdSlot
                                title="Premium Membership"
                                description="Get unlimited access to all courses and exclusive community features."
                                sponsor="Lumiere Pro"
                                variant="banner"
                                cta="Upgrade Now"
                                className="bg-foreground text-background border-none"
                            />

                            <div className="bg-white p-6 rounded-2xl border border-border shadow-sm mt-8">
                                <h3 className="font-bold text-lg mb-4 font-serif">Top Contributors</h3>
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200" />
                                    ))}
                                    <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                                        +42
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
