import Link from "next/link";
import { Doodle, SketchDivider } from "@/components/ui/Sketch";

const COLUMNS = [
    {
        heading: "둘러보기",
        links: [
            { href: "/blog", label: "매거진" },
            { href: "/community", label: "커뮤니티" },
            { href: "/curated", label: "큐레이션" },
            { href: "/recommend", label: "학원·교재 추천" },
        ],
    },
    {
        heading: "안내",
        links: [
            { href: "/contact", label: "문의하기" },
            { href: "/privacy", label: "개인정보처리방침" },
            { href: "/terms", label: "이용약관" },
        ],
    },
];

export function Footer() {
    return (
        <footer className="mt-24 border-t border-rule bg-paper-raised">
            <div className="container-page py-14">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2">
                            <Doodle name="lamp" className="h-7 w-7 text-lamp" />
                            <span className="text-lg font-bold tracking-tight">
                                책상서랍
                            </span>
                        </div>
                        <p className="mt-4 max-w-sm text-sm leading-relaxed text-graphite-soft">
                            공부하다 막힌 순간, 혼자 끙끙대지 않아도 되는 곳.
                            질문과 후기가 차곡차곡 쌓이는 책상 서랍 같은 커뮤니티입니다.
                        </p>
                        <p className="hand-label mt-6">오늘도 수고했어요 ✏️</p>
                    </div>

                    {COLUMNS.map((column) => (
                        <nav key={column.heading} aria-label={column.heading}>
                            <h2 className="text-sm font-bold text-graphite">
                                {column.heading}
                            </h2>
                            <ul className="mt-4 space-y-2.5">
                                {column.links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-graphite-soft transition-colors hover:text-lamp-ink"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    ))}
                </div>

                <SketchDivider className="my-10" />

                <p className="text-xs text-graphite-faint">
                    © {new Date().getFullYear()} 책상서랍. 학습 커뮤니티 프로젝트입니다.
                </p>
            </div>
        </footer>
    );
}
