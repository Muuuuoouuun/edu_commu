export function Footer() {
    return (
        <footer className="bg-white border-t border-slate-100 py-12 mt-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <span className="font-bold text-primary-DEFAULT">LUMIERE.</span>
                    <p>© 2024 Lumiere Education. All rights reserved.</p>
                </div>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-primary-DEFAULT transition-colors">Privacy</a>
                    <a href="#" className="hover:text-primary-DEFAULT transition-colors">Terms</a>
                    <a href="#" className="hover:text-primary-DEFAULT transition-colors">Contact</a>
                </div>
            </div>
        </footer>
    );
}
