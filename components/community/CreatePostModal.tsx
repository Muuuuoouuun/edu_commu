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
                        className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-2xl shadow-2xl z-[70] p-6"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <PenLine className="w-5 h-5 text-accent-rose" />
                                Write a Post
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="flex gap-4 mb-6">
                                <button
                                    type="button"
                                    onClick={() => setActiveType("question")}
                                    className={`flex-1 py-2 rounded-lg font-medium transition-colors ${activeType === "question" ? "bg-primary-DEFAULT text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
                                >
                                    Question
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveType("review")}
                                    className={`flex-1 py-2 rounded-lg font-medium transition-colors ${activeType === "review" ? "bg-accent-rose text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
                                >
                                    Review
                                </button>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Title (Optional)</label>
                                    <input
                                        name="title"
                                        type="text"
                                        className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-primary-DEFAULT outline-none transition-all"
                                        placeholder={activeType === "question" ? "What's your question?" : "What are you reviewing?"}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Content</label>
                                    <textarea
                                        name="content"
                                        required
                                        className="w-full h-32 px-4 py-2 rounded-xl border border-slate-200 focus:border-primary-DEFAULT outline-none transition-all resize-none"
                                        placeholder="Share your thoughts..."
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 text-slate-500 font-medium hover:bg-slate-50 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="bg-primary-DEFAULT text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-soft transition-colors flex items-center gap-2 disabled:opacity-70"
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
