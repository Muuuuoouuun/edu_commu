"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Doodle } from "@/components/ui/Sketch";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const result = await signIn("credentials", {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            redirect: false,
        });

        if (result?.error) {
            // 기존에는 alert()로 알렸다 — 화면 안에서 조용히 안내하도록 바꿨다
            setError("이메일 또는 비밀번호가 맞지 않아요. 다시 확인해 주세요.");
            setIsLoading(false);
            return;
        }

        router.push("/community");
        router.refresh();
    }

    return (
        <div className="container-read flex min-h-[80vh] items-center py-16">
            <div className="w-full">
                <div className="paper-card tape relative mx-auto max-w-md p-8 pt-10">
                    <div className="flex flex-col items-center text-center">
                        <Doodle name="lamp" className="h-12 w-12" />
                        <h1 className="mt-4 text-2xl">다시 오셨네요</h1>
                        <p className="mt-2 text-sm leading-relaxed text-graphite-soft">
                            로그인하면 글을 쓰고 댓글을 남길 수 있어요.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-1.5 block text-sm font-semibold"
                            >
                                이메일
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                defaultValue="test@example.com"
                                className="w-full rounded-[14px] border border-rule bg-paper-sunken px-4 py-3 text-sm transition-colors focus:border-lamp"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="mb-1.5 block text-sm font-semibold"
                            >
                                비밀번호
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                defaultValue="password123"
                                className="w-full rounded-[14px] border border-rule bg-paper-sunken px-4 py-3 text-sm transition-colors focus:border-lamp"
                            />
                        </div>

                        {error && (
                            <p
                                role="alert"
                                className="flex items-start gap-2 rounded-[14px] border border-eraser/30 bg-eraser-wash px-4 py-3 text-sm text-eraser"
                            >
                                <AlertCircle
                                    className="mt-0.5 h-4 w-4 shrink-0"
                                    aria-hidden="true"
                                />
                                {error}
                            </p>
                        )}

                        <Button
                            type="submit"
                            size="lg"
                            disabled={isLoading}
                            className="w-full"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2
                                        className="h-4 w-4 animate-spin"
                                        aria-hidden="true"
                                    />
                                    확인하는 중
                                </>
                            ) : (
                                "로그인"
                            )}
                        </Button>
                    </form>

                    <p className="mt-7 border-t border-rule pt-5 text-center text-xs leading-relaxed text-graphite-faint">
                        체험용 계정 · test@example.com / password123
                    </p>
                </div>

                <p className="mt-6 text-center text-sm text-graphite-soft">
                    아직 둘러보는 중이신가요?{" "}
                    <Link href="/community" className="font-semibold text-lamp-ink hover:underline">
                        로그인 없이 읽어보기
                    </Link>
                </p>
            </div>
        </div>
    );
}
