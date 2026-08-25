"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "system" | "light" | "dark";

const OPTIONS: { value: Theme; label: string; Icon: typeof Sun }[] = [
    { value: "light", label: "밝게", Icon: Sun },
    { value: "dark", label: "어둡게", Icon: Moon },
    { value: "system", label: "시스템 설정", Icon: Monitor },
];

const STORAGE_KEY = "theme";
const CHANGE_EVENT = "책상서랍:theme";

/** `.dark` 클래스를 <html>에 반영. layout의 인라인 스크립트와 같은 규칙. */
function apply(theme: Theme) {
    const dark =
        theme === "dark" ||
        (theme === "system" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", dark);
}

/**
 * localStorage를 외부 저장소로 보고 구독한다.
 * effect 안에서 setState를 호출하지 않으므로 불필요한 연쇄 렌더링이 없고,
 * 서버 렌더링 시에는 항상 "system"으로 시작해 하이드레이션이 어긋나지 않는다.
 */
function subscribe(onChange: () => void) {
    window.addEventListener("storage", onChange);
    window.addEventListener(CHANGE_EVENT, onChange);
    return () => {
        window.removeEventListener("storage", onChange);
        window.removeEventListener(CHANGE_EVENT, onChange);
    };
}

function getSnapshot(): Theme {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored === "light" || stored === "dark" ? stored : "system";
    } catch {
        return "system";
    }
}

const getServerSnapshot = (): Theme => "system";

export function ThemeToggle({ className }: { className?: string }) {
    const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    // 시스템 설정을 따르는 동안에는 OS 테마 변경에 실시간으로 반응
    useEffect(() => {
        if (theme !== "system") return;
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        const onChange = () => apply("system");
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, [theme]);

    function select(next: Theme) {
        try {
            localStorage.setItem(STORAGE_KEY, next);
        } catch {
            // 저장에 실패해도 현재 화면에는 반영한다
        }
        apply(next);
        window.dispatchEvent(new Event(CHANGE_EVENT));
    }

    return (
        <div
            role="group"
            aria-label="화면 테마"
            className={cn(
                "flex items-center border border-rule",
                className
            )}
        >
            {OPTIONS.map(({ value, label, Icon }) => {
                const active = theme === value;
                return (
                    <button
                        key={value}
                        type="button"
                        onClick={() => select(value)}
                        aria-label={label}
                        title={label}
                        aria-pressed={active}
                        className={cn(
                            "grid h-7 w-7 place-items-center transition-colors",
                            active
                                ? "bg-accent text-accent-on"
                                : "text-graphite-faint hover:text-graphite"
                        )}
                    >
                        <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                    </button>
                );
            })}
        </div>
    );
}
