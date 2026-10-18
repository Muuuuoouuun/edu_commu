"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

const DRAFTS = [
    { href: "/drafts/editorial", label: "A", name: "에디토리얼" },
    { href: "/drafts/hub", label: "B", name: "커뮤니티 허브" },
];

// Floating pill for flipping between drafts during review
export function DraftSwitcher() {
    const pathname = usePathname();
    if (pathname === "/drafts") return null;

    return (
        <nav
            aria-label="시안 전환"
            className="fixed bottom-24 left-1/2 -translate-x-1/2 md:bottom-6 md:left-auto md:right-6 md:translate-x-0 z-[60] flex items-center gap-1 rounded-full bg-ink/90 p-1 text-xs text-paper shadow-xl backdrop-blur"
        >
            <Link href="/drafts" aria-label="시안 목록" className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/10">
                <LayoutGrid className="h-4 w-4" />
            </Link>
            {DRAFTS.map((draft) => (
                <Link
                    key={draft.href}
                    href={draft.href}
                    aria-current={pathname === draft.href ? "page" : undefined}
                    className={cn(
                        "flex h-8 items-center gap-1.5 rounded-full px-3 transition-colors",
                        pathname === draft.href ? "bg-paper text-ink" : "hover:bg-white/10"
                    )}
                >
                    <span className="font-semibold">시안 {draft.label}</span>
                    <span className="hidden sm:inline opacity-70">{draft.name}</span>
                </Link>
            ))}
        </nav>
    );
}
