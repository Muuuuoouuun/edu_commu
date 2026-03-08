"use client";

import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { UserButton } from "./UserButton";
import { useState } from "react";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
    { href: "/", label: "매거진" },
    { href: "/community", label: "커뮤니티" },
    { href: "/curated", label: "큐레이션" },
    { href: "/recommend", label: "학원/교재 추천" },
];

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="sticky top-0 z-50 w-full border-b border-border bg-foreground/95 backdrop-blur-md text-background shadow-sm"
            >
                <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-xl font-bold tracking-tight text-white">
                            LUMIERE<span className="text-accent-gold">.</span>
                        </span>
                    </Link>

                    <nav className="hidden md:flex gap-8 text-sm font-semibold text-background/90">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`hover:text-accent-gold transition-colors ${pathname === link.href ? "text-accent-gold" : ""}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                            <Search className="w-5 h-5" />
                        </button>

                        <UserButton />

                        <button
                            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                            className="md:hidden p-2 hover:bg-white/20 rounded-full transition-colors"
                            aria-label="메뉴 열기"
                        >
                            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/40 z-40 md:hidden"
                        />
                        <motion.nav
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                            className="fixed top-0 right-0 h-full w-72 bg-foreground z-50 md:hidden flex flex-col pt-20 px-6"
                        >
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="absolute top-4 right-4 p-2 text-background/70 hover:text-background"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="space-y-1">
                                {NAV_LINKS.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`block py-4 text-lg font-semibold border-b border-white/10 transition-colors ${
                                            pathname === link.href
                                                ? "text-accent-gold"
                                                : "text-background/80 hover:text-accent-gold"
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/10">
                                <Link
                                    href="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block w-full text-center py-3 bg-accent-gold text-foreground font-semibold rounded-full hover:opacity-90 transition-opacity"
                                >
                                    로그인
                                </Link>
                            </div>
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
