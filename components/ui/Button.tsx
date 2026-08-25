import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "quiet" | "ghost";
type Size = "sm" | "md" | "lg";

/**
 * 각진 형태가 기본이다. 채움은 잉크 한 색뿐이고, 나머지는 1px 선으로만 구분한다.
 */
const BASE =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium " +
    "transition-[background-color,color,border-color] duration-200 " +
    "disabled:pointer-events-none disabled:opacity-40";

const VARIANTS: Record<Variant, string> = {
    primary: "bg-accent text-accent-on hover:opacity-85",
    outline:
        "border border-graphite bg-paper text-graphite hover:bg-paper-sunken",
    quiet:
        "border border-rule bg-paper text-graphite-soft hover:border-rule-strong hover:text-graphite",
    ghost: "text-graphite-soft hover:text-graphite",
};

const SIZES: Record<Size, string> = {
    sm: "h-8 px-3.5 text-[13px]",
    md: "h-10 px-5 text-sm",
    lg: "h-12 px-7 text-[15px]",
};

export function buttonStyles({
    variant = "primary",
    size = "md",
    className,
}: {
    variant?: Variant;
    size?: Size;
    className?: string;
} = {}) {
    return cn(BASE, VARIANTS[variant], SIZES[size], className);
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
    size?: Size;
};

export function Button({
    variant = "primary",
    size = "md",
    className,
    ...props
}: ButtonProps) {
    return (
        <button {...props} className={buttonStyles({ variant, size, className })} />
    );
}

type ButtonLinkProps = React.ComponentProps<typeof Link> & {
    variant?: Variant;
    size?: Size;
};

export function ButtonLink({
    variant = "primary",
    size = "md",
    className,
    ...props
}: ButtonLinkProps) {
    return <Link {...props} className={buttonStyles({ variant, size, className })} />;
}

/**
 * 텍스트 링크 — C안의 기본 행동 유도 방식.
 * 버튼 대신 밑줄 그은 한 줄로 다음 행동을 가리킨다.
 */
export function TextLink({
    className,
    ...props
}: React.ComponentProps<typeof Link>) {
    return (
        <Link
            {...props}
            className={cn(
                "inline-block border-b border-accent pb-1 text-[15px] font-medium text-accent transition-opacity hover:opacity-60",
                className
            )}
        />
    );
}

/** 아이콘만 있는 버튼 — `label`이 곧 aria-label이라 접근성 누락을 막는다. */
export function IconButton({
    label,
    className,
    variant = "ghost",
    ...props
}: Omit<ButtonProps, "aria-label"> & { label: string }) {
    return (
        <button
            {...props}
            aria-label={label}
            title={label}
            className={cn(BASE, VARIANTS[variant], "h-9 w-9 shrink-0 p-0", className)}
        />
    );
}
