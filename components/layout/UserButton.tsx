"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Skeleton } from "@/components/ui/Skeleton";
import { buttonStyles } from "@/components/ui/Button";

export function UserButton() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <Skeleton className="h-9 w-9 rounded-full" />;
    }

    if (session?.user) {
        const name = session.user.name ?? "회원";

        return (
            <div className="flex items-center gap-1.5">
                <span className="flex items-center gap-2 rounded-full border border-rule bg-paper-raised py-1 pl-1 pr-1 sm:pr-3">
                    <Avatar
                        name={name}
                        src={session.user.image ?? undefined}
                        size="sm"
                    />
                    <span className="hidden text-sm font-semibold sm:block">{name}</span>
                </span>
                <button
                    type="button"
                    onClick={() => signOut()}
                    aria-label="로그아웃"
                    title="로그아웃"
                    className="grid h-9 w-9 place-items-center rounded-full text-graphite-soft transition-colors hover:bg-eraser-wash hover:text-eraser"
                >
                    <LogOut className="h-4 w-4" />
                </button>
            </div>
        );
    }

    return (
        <Link href="/login" className={buttonStyles({ variant: "outline", size: "sm" })}>
            로그인
        </Link>
    );
}
