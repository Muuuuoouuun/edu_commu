
export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 md:px-6 py-24 max-w-xl">
            <h1 className="text-4xl font-bold mb-8 text-slate-900">Contact Us</h1>
            <p className="text-slate-600 mb-8">
                Have questions or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
            </p>

            <form className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT/50"
                        placeholder="you@example.com"
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                    <textarea
                        id="message"
                        rows={5}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT/50"
                        placeholder="How can we help?"
                    ></textarea>
                </div>
                <button className="w-full px-6 py-3 bg-primary-DEFAULT text-white font-bold rounded-lg hover:bg-primary-soft transition-colors">
                    Send Message
                </button>
            </form>
        </div>
    );
}
