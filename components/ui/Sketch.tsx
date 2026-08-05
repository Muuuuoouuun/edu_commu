import { cn } from "@/lib/utils";

/**
 * 손으로 그린 듯한 장식 요소 모음.
 * 모두 순수 SVG이며 `currentColor`를 따르므로 다크모드에서 자동으로 맞춰진다.
 * 장식 전용이라 전부 `aria-hidden`.
 */

/** 제목 아래 연필로 슥 그은 물결 밑줄 */
export function PencilUnderline({ className }: { className?: string }) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 240 12"
            preserveAspectRatio="none"
            className={cn("h-2.5 w-full text-lamp", className)}
        >
            <path
                d="M2 8.2c26-4.4 52-5.6 78-3.6 26 2 52 5 78 3.2 26-1.8 52-5.4 80-6.4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
            />
        </svg>
    );
}

/** 섹션 사이를 나누는 손그림 구분선 */
export function SketchDivider({ className }: { className?: string }) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 600 10"
            preserveAspectRatio="none"
            className={cn("h-2.5 w-full text-rule-strong", className)}
        >
            <path
                d="M3 6.5c48-3 96-4 145-2.4 49 1.6 98 4.4 147 3 49-1.4 98-5 152-4.6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
            <path
                d="M8 8.6c60-2.2 120-2.8 180-1.6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                opacity="0.5"
            />
        </svg>
    );
}

/** 강조하고 싶은 단어를 감싸는 손그림 동그라미 */
export function SketchCircle({ className }: { className?: string }) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 200 60"
            preserveAspectRatio="none"
            className={cn("absolute inset-0 h-full w-full text-lamp", className)}
        >
            <path
                d="M100 4C46 4 8 16 8 30s38 26 92 26 92-12 92-26S154 4 100 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                opacity="0.75"
            />
        </svg>
    );
}

export type DoodleName = "pencil" | "book" | "lamp" | "plant" | "mug" | "note";

const DOODLE_PATHS: Record<DoodleName, React.ReactNode> = {
    pencil: (
        <>
            <path d="M14 50l4-11 25-25 7 7-25 25-11 4z" />
            <path d="M43 14l7 7" />
            <path d="M18 39l7 7" />
        </>
    ),
    book: (
        <>
            <path d="M10 16c8-4 16-4 22 0v32c-6-4-14-4-22 0V16z" />
            <path d="M54 16c-8-4-16-4-22 0v32c6-4 14-4 22 0V16z" />
        </>
    ),
    lamp: (
        <>
            <path d="M20 26l12-14 12 14H20z" />
            <path d="M32 26v24" />
            <path d="M22 52h20" />
        </>
    ),
    plant: (
        <>
            <path d="M22 34h20l-3 18H25l-3-18z" />
            <path d="M32 34c0-8-4-14-11-16 1 9 4 14 11 16z" />
            <path d="M32 34c0-9 5-15 12-16-1 9-5 14-12 16z" />
        </>
    ),
    mug: (
        <>
            <path d="M16 24h26v20a8 8 0 01-8 8H24a8 8 0 01-8-8V24z" />
            <path d="M42 30h6a5 5 0 010 10h-6" />
            <path d="M24 16c0-3 3-3 3-6M33 16c0-3 3-3 3-6" />
        </>
    ),
    note: (
        <>
            <path d="M16 12h32v40H16V12z" />
            <path d="M24 24h16M24 32h16M24 40h10" />
        </>
    ),
};

/** 연필 스케치 아이콘 일러스트 */
export function Doodle({
    name,
    className,
}: {
    name: DoodleName;
    className?: string;
}) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 64 64"
            className={cn("h-10 w-10 text-lamp", className)}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {DOODLE_PATHS[name]}
        </svg>
    );
}
