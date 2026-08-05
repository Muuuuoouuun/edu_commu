import { cn } from "@/lib/utils";
import { Doodle, PencilUnderline, type DoodleName } from "./Sketch";

/** 각 페이지 상단의 공통 헤더 — 종이 위에 제목을 적고 밑줄을 그은 모양 */
export function PageHeader({
    eyebrow,
    title,
    description,
    doodle,
    children,
    className,
}: {
    eyebrow?: string;
    title: string;
    description?: string;
    doodle?: DoodleName;
    children?: React.ReactNode;
    className?: string;
}) {
    return (
        <header
            className={cn(
                "relative overflow-hidden border-b border-rule",
                className
            )}
        >
            <div aria-hidden="true" className="lamp-glow absolute inset-0" />

            <div className="container-page relative flex flex-col gap-8 py-12 sm:flex-row sm:items-center sm:justify-between sm:py-16">
                <div className="max-w-2xl">
                    {eyebrow && <p className="hand-label mb-3">{eyebrow}</p>}
                    <h1 className="relative inline-block text-3xl leading-tight sm:text-4xl">
                        {title}
                        <PencilUnderline className="absolute -bottom-2 left-0 h-2.5 w-full" />
                    </h1>
                    {description && (
                        <p className="mt-6 text-[15px] leading-relaxed text-graphite-soft sm:text-base">
                            {description}
                        </p>
                    )}
                    {children && <div className="mt-7">{children}</div>}
                </div>

                {doodle && (
                    <div className="hidden shrink-0 sm:block">
                        <div className="sketch-frame-alt grid h-28 w-28 place-items-center bg-paper-raised">
                            <Doodle name={doodle} className="h-14 w-14" />
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
