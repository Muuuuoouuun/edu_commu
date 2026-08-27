import { cn } from "@/lib/utils";

/** 페이지 상단 — 눈썹 라벨, 제목, 설명. 장식은 두지 않는다. */
export function PageHeader({
    eyebrow,
    title,
    description,
    children,
    className,
}: {
    eyebrow?: string;
    title: string;
    description?: string;
    children?: React.ReactNode;
    className?: string;
}) {
    return (
        <header className={cn("border-b border-rule", className)}>
            <div className="container-page py-16 sm:py-20">
                {eyebrow && <p className="eyebrow mb-8">{eyebrow}</p>}
                <h1 className="text-[30px] leading-[1.4] sm:text-[40px] sm:leading-[1.4]">
                    {title}
                </h1>
                {description && (
                    <p className="mt-7 max-w-xl text-[15px] leading-[1.9] text-graphite-soft sm:text-base">
                        {description}
                    </p>
                )}
                {children && <div className="mt-9">{children}</div>}
            </div>
        </header>
    );
}
