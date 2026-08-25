import Link from "next/link";

const LINKS = [
    { href: "/blog", label: "매거진" },
    { href: "/community", label: "커뮤니티" },
    { href: "/curated", label: "큐레이션" },
    { href: "/recommend", label: "학원·교재 추천" },
    { href: "/contact", label: "문의하기" },
    { href: "/privacy", label: "개인정보처리방침" },
    { href: "/terms", label: "이용약관" },
];

export function Footer() {
    return (
        <footer className="mt-auto border-t border-rule">
            <div className="container-page flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[13px] text-graphite-faint">
                    © {new Date().getFullYear()} 책상서랍
                </p>
                <nav aria-label="푸터 메뉴">
                    <ul className="flex flex-wrap gap-x-7 gap-y-2">
                        {LINKS.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="text-[13px] text-graphite-soft transition-opacity hover:opacity-60"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </footer>
    );
}
