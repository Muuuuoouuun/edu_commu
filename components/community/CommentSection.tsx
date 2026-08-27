"use client";

import { useState } from "react";
import { Send, ThumbsUp } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Comment = {
    id: number;
    author: { name: string; avatar?: string };
    text: string;
    time: string;
    likes: number;
};

const INITIAL_COMMENTS: Comment[] = [
    {
        id: 1,
        author: { name: "박지훈" },
        text: "저도 같은 데서 막혔었는데, 개념서 예제부터 다시 푸니까 풀리더라고요. 급할수록 앞으로 돌아가는 게 빠른 것 같아요.",
        time: "2시간 전",
        likes: 5,
    },
    {
        id: 2,
        author: { name: "최서연" },
        text: "혹시 몇 학년 과정인지 알려주실 수 있을까요? 그거에 따라 추천드릴 교재가 달라질 것 같아서요.",
        time: "5시간 전",
        likes: 2,
    },
];

export function CommentSection() {
    const [comments, setComments] = useState(INITIAL_COMMENTS);
    const [draft, setDraft] = useState("");
    // 아직 서버에 저장되지 않는다 — 새로고침하면 사라진다
    const [helpful, setHelpful] = useState<Set<number>>(new Set());

    function toggleHelpful(id: number) {
        setHelpful((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    }

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        const text = draft.trim();
        if (!text) return;

        setComments((prev) => [
            {
                id: Date.now(),
                author: { name: "나" },
                text,
                time: "방금",
                likes: 0,
            },
            ...prev,
        ]);
        setDraft("");
    }

    return (
        <section aria-labelledby="comments-heading">
            <div className="flex items-center gap-2">
                <h2 id="comments-heading" className="text-xl">
                    댓글 {comments.length}
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="mt-6">
                <label htmlFor="comment-input" className="sr-only">
                    댓글 입력
                </label>
                <div className="paper-card p-4">
                    <textarea
                        id="comment-input"
                        value={draft}
                        onChange={(event) => setDraft(event.target.value)}
                        rows={3}
                        placeholder="짧게라도 좋아요. 겪어본 이야기를 남겨주세요."
                        className="w-full resize-none bg-transparent text-[15px] leading-relaxed outline-none"
                    />
                    <div className="mt-3 flex justify-end border-t border-rule pt-3">
                        <Button type="submit" size="sm" disabled={!draft.trim()}>
                            <Send className="h-3.5 w-3.5" aria-hidden="true" />
                            남기기
                        </Button>
                    </div>
                </div>
            </form>

            <ul className="mt-8 space-y-6">
                {comments.map((comment) => (
                    <li key={comment.id} className="flex gap-3">
                        <Avatar
                            name={comment.author.name}
                            src={comment.author.avatar}
                            size="sm"
                            className="mt-0.5"
                        />
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold">
                                    {comment.author.name}
                                </span>
                                <span className="text-xs text-graphite-faint">
                                    {comment.time}
                                </span>
                            </div>
                            <p className="mt-1.5 text-[15px] leading-relaxed text-graphite-soft">
                                {comment.text}
                            </p>
                            <button
                                type="button"
                                onClick={() => toggleHelpful(comment.id)}
                                aria-pressed={helpful.has(comment.id)}
                                className={cn(
                                    "mt-2.5 inline-flex items-center gap-1.5 text-xs transition-colors",
                                    helpful.has(comment.id)
                                        ? "text-graphite"
                                        : "text-graphite-faint hover:text-graphite"
                                )}
                            >
                                <ThumbsUp
                                    className={cn(
                                        "h-3 w-3",
                                        helpful.has(comment.id) && "fill-current"
                                    )}
                                    aria-hidden="true"
                                />
                                도움돼요 {comment.likes + (helpful.has(comment.id) ? 1 : 0)}
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
