import Link from "next/link";
export function Footer() {
    return (
        <footer className="bg-background border-t border-border py-12 mt-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <span className="font-serif font-bold text-xl text-foreground">LUMIERE.</span>
                    <p className="text-muted text-sm md:col-span-3">© 2025 Lumiere Education. All rights reserved.</p>
                </div>
                <div className="flex gap-6 text-sm text-muted">
                    <Link href="/privacy" className="hover:text-foreground transition-colors">개인정보처리방침</Link>
                    <Link href="/terms" className="hover:text-foreground transition-colors">이용약관</Link>
                    <Link href="/contact" className="hover:text-foreground transition-colors">문의하기</Link>
                </div>
            </div>
        </footer>
    );
}
