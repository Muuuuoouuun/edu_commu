"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button, IconButton } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { PostType } from "@/lib/types";

const TYPES: { value: PostType; label: string; hint: string }[] = [
    {
        value: "question",
        label: "질문",
        hint: "무엇을 해봤는지 같이 적어주시면 답이 빨라져요.",
    },
    {
        value: "review",
        label: "후기",
        hint: "좋았던 점과 아쉬웠던 점을 함께 남겨주세요.",
    },
];

export function CreatePostModal({
    isOpen,
    onClose,
    onSuccess,
}: {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [activeType, setActiveType] = useState<PostType>("question");
    const [error, setError] = useState<string | null>(null);
    const { data: session } = useSession();
    const router = useRouter();
    const dialogRef = useRef<HTMLDivElement>(null);

    // Esc로 닫기 + 열려 있는 동안 배경 스크롤 잠금
    useEffect(() => {
        if (!isOpen) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        document.addEventListener("keydown", onKeyDown);
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        dialogRef.current?.focus();

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen, onClose]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);

        if (!session) {
            router.push("/login");
            return;
        }

        setIsLoading(true);
        const formData = new FormData(event.currentTarget);

        try {
            const res = await fetch("/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: formData.get("title"),
                    content: formData.get("content"),
                    type: activeType,
                }),
            });

            if (!res.ok) {
                setError("글을 올리지 못했어요. 잠시 후 다시 시도해 주세요.");
                return;
            }

            onSuccess?.();
            onClose();
        } catch (err) {
            console.error("글 작성 실패", err);
            setError("네트워크 문제로 글을 올리지 못했어요.");
        } finally {
            setIsLoading(false);
        }
    }

    const activeHint = TYPES.find((type) => type.value === activeType)?.hint;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-graphite/40 backdrop-blur-[2px]"
                    />
                    <motion.div
                        ref={dialogRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="create-post-title"
                        tabIndex={-1}
                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="fixed left-1/2 top-1/2 z-[70] max-h-[90vh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto border border-rule bg-paper-raised p-6 sm:p-8"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h2 id="create-post-title" className="text-xl">
                                    글 쓰기
                                </h2>
                                <p className="mt-2 text-sm text-graphite-soft">{activeHint}</p>
                            </div>
                            <IconButton label="닫기" onClick={onClose}>
                                <X className="h-4 w-4" />
                            </IconButton>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-6">
                            <fieldset>
                                <legend className="sr-only">글 종류</legend>
                                <div className="flex gap-2">
                                    {TYPES.map((type) => {
                                        const active = activeType === type.value;
                                        return (
                                            <button
                                                key={type.value}
                                                type="button"
                                                aria-pressed={active}
                                                onClick={() => setActiveType(type.value)}
                                                className={cn(
                                                    "flex-1 border py-2 text-sm transition-colors",
                                                    active
                                                        ? "border-accent bg-paper-sunken text-accent"
                                                        : "border-rule text-graphite-faint hover:text-graphite"
                                                )}
                                            >
                                                {type.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </fieldset>

                            <div className="mt-6 space-y-5">
                                <div>
                                    <label
                                        htmlFor="post-title"
                                        className="mb-1.5 block text-sm font-semibold"
                                    >
                                        제목{" "}
                                        <span className="font-normal text-graphite-faint">
                                            (선택)
                                        </span>
                                    </label>
                                    <input
                                        id="post-title"
                                        name="title"
                                        type="text"
                                        placeholder={
                                            activeType === "question"
                                                ? "어디서 막히셨나요?"
                                                : "무엇에 대한 후기인가요?"
                                        }
                                        className="w-full border border-rule bg-paper-sunken px-4 py-3 text-sm transition-colors focus:border-accent"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="post-content"
                                        className="mb-1.5 block text-sm font-semibold"
                                    >
                                        내용
                                    </label>
                                    <textarea
                                        id="post-content"
                                        name="content"
                                        required
                                        rows={7}
                                        placeholder="다듬지 않아도 괜찮아요. 떠오르는 대로 적어주세요."
                                        className="w-full resize-none border border-rule bg-paper-sunken px-4 py-3 text-sm leading-relaxed transition-colors focus:border-accent"
                                    />
                                </div>
                            </div>

                            {error && (
                                <p
                                    role="alert"
                                    className="mt-5 flex items-start gap-2 border border-danger/30 bg-danger-wash px-4 py-3 text-sm text-danger"
                                >
                                    <AlertCircle
                                        className="mt-0.5 h-4 w-4 shrink-0"
                                        aria-hidden="true"
                                    />
                                    {error}
                                </p>
                            )}

                            {!session && (
                                <p className="mt-5 border border-dashed border-rule-strong px-4 py-3 text-sm text-graphite-soft">
                                    글을 올리려면 로그인이 필요해요. 등록을 누르면
                                    로그인 화면으로 이동합니다.
                                </p>
                            )}

                            <div className="mt-7 flex justify-end gap-2">
                                <Button type="button" variant="ghost" onClick={onClose}>
                                    취소
                                </Button>
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2
                                                className="h-4 w-4 animate-spin"
                                                aria-hidden="true"
                                            />
                                            올리는 중
                                        </>
                                    ) : (
                                        "등록"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
