"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserButton } from "./UserButton";
import { ThemeToggle } from "./ThemeToggle";
import { Doodle } from "@/components/ui/Sketch";

const NAV_LINKS = [
    { href: "/", label: "홈" },
    { href: "/blog", label: "매거진" },
    { href: "/community", label: "커뮤니티" },
    { href: "/curated", label: "큐레이션" },
    { href: "/recommend", label: "학원·교재 추천" },
];

function isActive(pathname: string, href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Navbar() {
    const pathname = usePathname();

    // 메뉴를 연 시점의 경로를 함께 기억한다.
    // 경로가 바뀌면 열림 상태가 자동으로 무효가 되므로 effect로 닫을 필요가 없다.
    const [openedAt, setOpenedAt] = useState<string | null>(null);
    const menuOpen = openedAt === pathname;

    return (
        <header className="sticky top-0 z-50 border-b border-rule bg-paper/85 backdrop-blur-md">
            <div className="container-page flex h-16 items-center justify-between gap-4">
                <Link
                    href="/"
                    className="flex items-center gap-2 rounded-full"
                    aria-label="책상서랍 홈으로"
                >
                    <Doodle name="lamp" className="h-7 w-7 text-lamp" />
                    <span className="text-lg font-bold tracking-tight">책상서랍</span>
                </Link>

                <nav aria-label="주요 메뉴" className="hidden lg:block">
                    <ul className="flex items-center gap-1">
                        {NAV_LINKS.map((link) => {
                            const active = isActive(pathname, link.href);
                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        aria-current={active ? "page" : undefined}
                                        className={cn(
                                            "relative block rounded-full px-3.5 py-2 text-sm font-semibold transition-colors",
                                            active
                                                ? "text-lamp-ink"
                                                : "text-graphite-soft hover:bg-paper-sunken hover:text-graphite"
                                        )}
                                    >
                                        {link.label}
                                        {active && (
                                            <span
                                                aria-hidden="true"
                                                className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-lamp"
                                            />
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="flex items-center gap-2">
                    <ThemeToggle className="hidden sm:flex" />

                    <Link
                        href="/recommend"
                        aria-label="학원·교재 검색"
                        title="학원·교재 검색"
                        className="grid h-9 w-9 place-items-center rounded-full text-graphite-soft transition-colors hover:bg-paper-sunken hover:text-graphite"
                    >
                        <Search className="h-[18px] w-[18px]" />
                    </Link>

                    <UserButton />

                    <button
                        type="button"
                        onClick={() => setOpenedAt(menuOpen ? null : pathname)}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-menu"
                        aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
                        className="grid h-9 w-9 place-items-center rounded-full text-graphite-soft transition-colors hover:bg-paper-sunken hover:text-graphite lg:hidden"
                    >
                        {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* 모바일 메뉴 — 기존에는 버튼만 있고 아무 동작도 하지 않았다 */}
            <div
                id="mobile-menu"
                hidden={!menuOpen}
                className="border-t border-rule bg-paper-raised lg:hidden"
            >
                <nav aria-label="모바일 메뉴" className="container-page py-3">
                    <ul className="flex flex-col">
                        {NAV_LINKS.map((link) => {
                            const active = isActive(pathname, link.href);
                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        aria-current={active ? "page" : undefined}
                                        className={cn(
                                            "flex items-center justify-between rounded-md px-2 py-3 text-[15px] font-semibold transition-colors",
                                            active
                                                ? "text-lamp-ink"
                                                : "text-graphite-soft hover:text-graphite"
                                        )}
                                    >
                                        {link.label}
                                        {active && (
                                            <span
                                                aria-hidden="true"
                                                className="h-1.5 w-1.5 rounded-full bg-lamp"
                                            />
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="mt-3 flex items-center justify-between border-t border-rule pt-4 sm:hidden">
                        <span className="text-sm text-graphite-soft">화면 테마</span>
                        <ThemeToggle />
                    </div>
                </nav>
            </div>
        </header>
    );
}
