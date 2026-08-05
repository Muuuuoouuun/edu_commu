import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Doodle, type DoodleName } from "./Sketch";

/**
 * 광고 슬롯. 콘텐츠 카드와 헷갈리지 않도록 점선 테두리 + "광고" 표기를 유지한다.
 * 커뮤니티 신뢰를 위해 네이티브 광고라도 출처를 흐리지 않는다.
 */
export function AdSlot({
    variant = "inline",
    title,
    description,
    cta = "자세히 보기",
    href = "#",
    sponsor,
    doodle = "note",
    className,
}: {
    variant?: "inline" | "panel";
    title: string;
    description: string;
    cta?: string;
    href?: string;
    sponsor?: string;
    doodle?: DoodleName;
    className?: string;
}) {
    const isPanel = variant === "panel";

    return (
        <aside
            aria-label="광고"
            className={cn(
                "group relative rounded-[18px] border border-dashed border-rule-strong bg-paper-sunken p-5",
                isPanel ? "flex flex-col gap-3" : "flex items-start gap-4",
                className
            )}
        >
            <span className="absolute right-4 top-4 font-[family-name:var(--font-hand)] text-sm leading-none text-graphite-faint">
                광고
            </span>

            <div
                className={cn(
                    "grid shrink-0 place-items-center rounded-md border border-rule bg-paper-raised",
                    isPanel ? "h-14 w-14" : "h-16 w-16"
                )}
            >
                <Doodle name={doodle} className="h-8 w-8 text-wood" />
            </div>

            <div className="min-w-0 flex-1">
                <h3 className="pr-10 text-base leading-snug">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-graphite-soft">
                    {description}
                </p>
                {sponsor && (
                    <p className="mt-2 text-xs text-graphite-faint">{sponsor} 제공</p>
                )}
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-lamp-ink hover:underline"
                >
                    {cta}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
            </div>
        </aside>
    );
}
