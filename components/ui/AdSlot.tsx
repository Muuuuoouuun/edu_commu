import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 광고 슬롯. 콘텐츠와 헷갈리지 않도록 점선 테두리와 '광고' 표기를 유지한다.
 * 커뮤니티 신뢰를 위해 출처를 흐리지 않는다.
 */
export function AdSlot({
    title,
    description,
    cta = "자세히 보기",
    href = "#",
    sponsor,
    className,
}: {
    title: string;
    description: string;
    cta?: string;
    href?: string;
    sponsor?: string;
    className?: string;
}) {
    return (
        <aside
            aria-label="광고"
            className={cn(
                "relative border border-dashed border-rule-strong p-6",
                className
            )}
        >
            <span className="absolute right-5 top-5 text-[11px] tracking-wide text-graphite-faint">
                광고
            </span>
            <h3 className="pr-12 text-lg leading-[1.5]">{title}</h3>
            <p className="mt-2 max-w-xl text-sm leading-[1.8] text-graphite-soft">
                {description}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1">
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex items-center gap-1 border-b border-graphite pb-0.5 text-sm transition-opacity hover:opacity-60"
                >
                    {cta}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                {sponsor && (
                    <span className="text-xs text-graphite-faint">{sponsor} 제공</span>
                )}
            </div>
        </aside>
    );
}
