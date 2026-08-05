import { cn } from "@/lib/utils";

/**
 * 본문 서식.
 * 기존 코드는 `prose prose-slate` 클래스를 썼지만 @tailwindcss/typography 플러그인이
 * 설치돼 있지 않아 아무 효과가 없었다. 필요한 서식만 직접 정의한다.
 */
export function Prose({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div
            className={cn(
                "text-[16px] leading-[1.85] text-graphite-soft",
                "[&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:text-graphite",
                "[&_h3]:mb-2 [&_h3]:mt-8 [&_h3]:text-lg [&_h3]:text-graphite",
                "[&_p]:my-4",
                "[&_ul]:my-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5",
                "[&_ol]:my-4 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5",
                "[&_strong]:font-semibold [&_strong]:text-graphite",
                "[&_a]:font-semibold [&_a]:text-lamp-ink hover:[&_a]:underline",
                className
            )}
        >
            {children}
        </div>
    );
}
