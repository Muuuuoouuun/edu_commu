import { cn } from "@/lib/utils";
import { Doodle, type DoodleName } from "./Sketch";

/**
 * 매거진 카드의 커버.
 * 이 화면에서 유일하게 남긴 그림 요소라, 색은 쓰지 않고 연필 도안과
 * 모눈 질감만으로 만든다. 커버끼리는 도안만 다르고 배경은 모두 같다.
 */
export function SketchCover({
    doodle = "book",
    label,
    className,
}: {
    doodle?: DoodleName;
    /** 커버 위에 손글씨로 얹는 과목 라벨 */
    label?: string;
    className?: string;
}) {
    return (
        <div
            aria-hidden="true"
            className={cn(
                "relative isolate flex items-center justify-center overflow-hidden bg-paper-sunken",
                className
            )}
        >
            <div className="grid-paper absolute inset-0 opacity-60" />
            <div className="relative flex flex-col items-center gap-2.5">
                <Doodle name={doodle} className="h-10 w-10 text-graphite/50" />
                {label && (
                    <span className="font-[family-name:var(--font-hand)] text-lg leading-none text-graphite-soft">
                        {label}
                    </span>
                )}
            </div>
        </div>
    );
}
