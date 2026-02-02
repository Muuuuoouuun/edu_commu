"use client";

import Link from "next/link";
import { User, Search, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { UserButton } from "./UserButton";

export function Navbar() {
    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="sticky top-0 z-50 w-full border-b border-glass-border bg-glass backdrop-blur-md text-text-main"
        >
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-xl font-bold tracking-tight text-white">
                        LUMIERE<span className="text-accent-gold">.</span>
                    </span>
                </Link>

                <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-200">
                    <Link href="/" className="hover:text-accent-gold transition-colors">매거진</Link>
                    <Link href="/community" className="hover:text-accent-gold transition-colors">커뮤니티</Link>
                    <Link href="/curated" className="hover:text-accent-gold transition-colors">큐레이션</Link>
                </nav>

                <div className="flex items-center gap-4">
                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <Search className="w-5 h-5" />
                    </button>

                    <UserButton />

                    <button className="md:hidden p-2 hover:bg-white/10 rounded-full">
                        <Menu className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </motion.header>
    );
}
