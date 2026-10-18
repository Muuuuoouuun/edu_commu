import type { Metadata } from "next";
import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import { DraftSwitcher } from "@/components/drafts/DraftSwitcher";
import { cn } from "@/lib/utils";

const notoSans = Noto_Sans_KR({ subsets: ["latin"], variable: "--font-kr-sans", display: "swap" });
const notoSerif = Noto_Serif_KR({ subsets: ["latin"], variable: "--font-kr-serif", display: "swap" });

export const metadata: Metadata = {
    title: "홈 디자인 시안 | LUMIERE",
    robots: { index: false, follow: false },
};

export default function DraftsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={cn(notoSans.variable, notoSerif.variable, "font-kr break-keep")}>
            {children}
            <DraftSwitcher />
        </div>
    );
}
