"use client";

import { useState, useEffect } from "react";
import { CommunityCard } from "@/components/ui/CommunityCard";
import { motion, AnimatePresence } from "framer-motion";
import { AdSlot } from "@/components/ui/AdSlot";
import { CreatePostModal } from "@/components/community/CreatePostModal";
import { PenSquare } from "lucide-react";

const TABS = ["All", "Questions", "Reviews"];

// MOCK_POSTS removed - fetching from API

export function CommunitySection() {
    const [activeTab, setActiveTab] = useState("All");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [posts, setPosts] = useState<any[]>([]);
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

    // Initial fetch
    useEffect(() => {
        fetchPosts();
    }, []);

    const handlePostCreated = () => {
        fetchPosts(); // Refresh list
        setIsModalOpen(false);
    };

    const filteredPosts = activeTab === "All"
        ? posts
        : posts.filter(post => post.type === activeTab.toLowerCase().slice(0, -1)); // "Questions" -> "question"

    return (
        <section className="py-20 bg-slate-50">
            <CreatePostModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handlePostCreated}
            />

            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-primary-DEFAULT font-serif mb-4">The Community<span className="text-accent-rose">.</span></h2>
                        <p className="text-text-muted max-w-xl">A safe haven for sharing insights, asking questions, and growing together.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-primary-DEFAULT text-white rounded-full font-medium hover:bg-primary-soft transition-all shadow-lg hover:shadow-primary-DEFAULT/25"
                        >
                            <PenSquare className="w-4 h-4" />
                            <span>Write Post</span>
                        </button>

                        {/* Custom Tab Switcher */}
                        <div className="flex p-1 bg-white rounded-full border border-slate-200 shadow-sm">
                            {TABS.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className="relative px-6 py-2 rounded-full text-sm font-medium transition-colors"
                                >
                                    {activeTab === tab && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-primary-DEFAULT rounded-full"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className={activeTab === tab ? "relative z-10 text-white" : "relative z-10 text-slate-500 hover:text-slate-900"}>
                                        {tab}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Feed */}
                    <div className="lg:col-span-2 space-y-6">
                        {isLoading ? (
                            <div className="text-center py-20 text-slate-400">Loading community...</div>
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
                                            {/* Native Horizontal Scroll Ad inserted after 2nd item */}
                                            {idx === 1 && (
                                                <div className="my-8 -mx-4 md:-mx-0 overflow-x-auto pb-4 hide-scrollbar">
                                                    <div className="flex gap-4 px-4 md:px-0 w-max">
                                                        {[1, 2, 3].map((card) => (
                                                            <div key={card} className="w-72 p-4 bg-white border border-accent-gold/20 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer group">
                                                                <div className="w-full h-32 bg-accent-gold/10 rounded-lg mb-3 flex items-center justify-center text-accent-gold">
                                                                    <span className="text-xs font-bold uppercase tracking-widest">Seminar</span>
                                                                </div>
                                                                <h5 className="font-bold text-slate-800 mb-1 group-hover:text-primary-soft">Design Leadership 101</h5>
                                                                <p className="text-xs text-slate-500">Starts Oct 30 • Online</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    {filteredPosts.length === 0 && (
                                        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                                            <p className="text-slate-500 mb-2">No posts yet.</p>
                                            <button onClick={() => setIsModalOpen(true)} className="text-primary-DEFAULT font-medium hover:underline">Be the first to share!</button>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        )}
                    </div>

                    {/* Sticky Sidebar / Recommendation */}
                    <div className="hidden lg:block space-y-8">
                        <div className="sticky top-24">
                            <AdSlot
                                title="Premium Membership"
                                description="Get unlimited access to all courses and exclusive community features."
                                sponsor="Lumiere Pro"
                                variant="banner"
                                cta="Upgrade Now"
                                className="bg-primary-DEFAULT text-white border-none"
                            />

                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mt-8">
                                <h3 className="font-bold text-lg mb-4">Top Contributors</h3>
                                {/* Minimal list of avatars */}
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
