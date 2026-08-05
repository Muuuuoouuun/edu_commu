import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/layout/Providers";

/**
 * 폰트 전략
 *
 * 본문: 시스템에 설치된 Pretendard → Apple SD Gothic Neo / 맑은 고딕으로 폴백
 * (globals.css의 --font-sans 스택). 본문 가독성을 네트워크 폰트에 걸지 않는다.
 *
 * 손글씨: Gaegu를 <link>로 직접 불러온다. `next/font/google`은 이 폰트의
 * latin 서브셋만 내려받아서 정작 한글에는 손글씨가 적용되지 않는다
 * (번들된 폰트 메타데이터에 korean 서브셋이 없음). Google Fonts CSS는
 * 한글 unicode-range를 포함하므로 직접 링크해야 의도한 모양이 나온다.
 * 장식 전용이라 로드에 실패해도 --font-hand 스택의 다음 폰트로 대체된다.
 */
const GAEGU_HREF =
    "https://fonts.googleapis.com/css2?family=Gaegu:wght@400;700&display=swap";

export const metadata: Metadata = {
    title: {
        default: "책상서랍 · 공부하는 사람들의 커뮤니티",
        template: "%s · 책상서랍",
    },
    description:
        "학습 고민을 나누고 학원·교재·앱 후기를 함께 쌓아가는 공간입니다. 늦은 밤 스탠드 아래 책상처럼 편하게 머물다 가세요.",
};

/** 첫 페인트 전에 테마를 확정해 깜빡임을 막는다. ThemeToggle과 같은 규칙. */
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||((t===null||t==='system')&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d)}catch(e){}})()`;

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="ko" suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin=""
                />
                <link rel="stylesheet" href={GAEGU_HREF} />
            </head>
            <body className="paper-grain flex min-h-screen flex-col bg-paper font-sans text-graphite antialiased">
                <Providers>
                    <a
                        href="#main"
                        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-lamp-solid focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-lamp-on"
                    >
                        본문으로 건너뛰기
                    </a>
                    <Navbar />
                    <main id="main" className="w-full flex-1">
                        {children}
                    </main>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
