import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "soft" | "ghost";
type Size = "sm" | "md" | "lg";

const BASE =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap " +
    "transition-[background-color,color,border-color,box-shadow,transform] duration-200 " +
    "active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const VARIANTS: Record<Variant, string> = {
    primary:
        "bg-lamp-solid text-lamp-on shadow-[0_1px_0_var(--rule-strong)] hover:brightness-110",
    outline:
        "border border-rule-strong bg-paper-raised text-graphite hover:bg-lamp-wash hover:border-lamp",
    soft: "bg-lamp-wash text-lamp-ink hover:brightness-[0.97]",
    ghost: "text-graphite-soft hover:bg-paper-sunken hover:text-graphite",
};

const SIZES: Record<Size, string> = {
    sm: "h-8 px-3.5 text-[13px]",
    md: "h-10 px-5 text-sm",
    lg: "h-12 px-7 text-base",
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
            className={cn(
                BASE,
                VARIANTS[variant],
                "h-9 w-9 shrink-0 p-0",
                className
            )}
        />
    );
}
