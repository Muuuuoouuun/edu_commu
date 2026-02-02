"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, PenLine, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface CreatePostModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export function CreatePostModal({ isOpen, onClose, onSuccess }: CreatePostModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [activeType, setActiveType] = useState<"question" | "review">("question");
    const { data: session } = useSession();
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!session) {
            alert("Please sign in to post.");
            router.push("/login");
            return;
        }

        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const title = formData.get("title");
        const content = formData.get("content");

        try {
            const res = await fetch("/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    content,
                    type: activeType
                }),
            });

            if (res.ok) {
                onSuccess?.();
                onClose();
            } else {
                alert("Failed to create post. Please try again.");
            }
        } catch (error) {
            console.error("Error creating post", error);
            alert("An error occurred.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-foreground/30 z-[60] backdrop-blur-[2px]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: 10 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-background border border-border shadow-2xl z-[70] p-8"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-serif font-medium text-foreground">
                                Write a Post
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-muted/10 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-muted" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="flex gap-4 mb-8">
                                <button
                                    type="button"
                                    onClick={() => setActiveType("question")}
                                    className={`flex-1 py-2 font-medium border transition-all text-sm uppercase tracking-widest ${activeType === "question" ? "bg-foreground text-background border-foreground" : "bg-transparent text-muted border-border hover:border-muted"}`}
                                >
                                    Question
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveType("review")}
                                    className={`flex-1 py-2 font-medium border transition-all text-sm uppercase tracking-widest ${activeType === "review" ? "bg-foreground text-background border-foreground" : "bg-transparent text-muted border-border hover:border-muted"}`}
                                >
                                    Review
                                </button>
                            </div>

                            <div className="space-y-6 mb-10">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">Title (Optional)</label>
                                    <input
                                        name="title"
                                        type="text"
                                        className="w-full bg-transparent px-4 py-3 border border-border focus:border-foreground outline-none transition-colors text-sm"
                                        placeholder={activeType === "question" ? "What's your question?" : "What are you reviewing?"}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">Content</label>
                                    <textarea
                                        name="content"
                                        required
                                        className="w-full h-40 bg-transparent px-4 py-3 border border-border focus:border-foreground outline-none transition-colors text-sm resize-none"
                                        placeholder="Share your thoughts..."
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-6 py-2 text-sm font-medium text-muted hover:text-foreground transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="bg-foreground text-background px-10 py-2 font-medium hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50"
                                >
                                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Post"}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
