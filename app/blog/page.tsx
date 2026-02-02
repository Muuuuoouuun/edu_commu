import { NewsCard } from "@/components/ui/NewsCard";

const NEWS_ITEMS = [
    {
        id: 1,
        title: "Optogenetics-enabled discovery of integrated stress response modulators",
        excerpt: "In this landmark Cell publication, we unveil our first-of-a-kind optogenetic screening platform, which unlocks a novel mode of drug discovery.",
        category: "Publications",
        date: "September 4, 2025",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2600&auto=format&fit=crop",
        variant: "hero" as const,
    },
    {
        id: 2,
        title: "Scaling Computer Vision to Solve Aging",
        excerpt: "How computer vision is revolutionizing the way we understand biological aging processes.",
        category: "News",
        date: "December 18, 2025",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2600&auto=format&fit=crop",
        variant: "light" as const,
    },
    {
        id: 3,
        title: "Aging as an Engineering Problem",
        excerpt: "Reframing biological decay as a solvable engineering challenge rather than an inevitability.",
        category: "News",
        date: "December 2, 2025",
        variant: "dark" as const,
    },
    {
        id: 4,
        title: "Inside Our Science: Nobel Laureate Sir David MacMillan on Collaboration",
        excerpt: "A deep dive into cross-disciplinary research strategies with one of the world's leading chemists.",
        category: "News",
        date: "November 21, 2025",
        variant: "dark" as const,
    },
    {
        id: 5,
        title: "Bio-printing the future of regenerative medicine",
        excerpt: "Exploring the latest breakthroughs in 3D bioprinting organs and tissues.",
        category: "Research",
        date: "November 15, 2025",
        image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=2600&auto=format&fit=crop",
        variant: "light" as const,
    }
];

export default function BlogPage() {
    return (
        <div className="min-h-screen py-24 container mx-auto px-4 md:px-6">
            <h1 className="text-4xl md:text-5xl font-sans font-light tracking-tight text-text-main mb-12">
                All Articles
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {NEWS_ITEMS.map((item) => (
                    <NewsCard key={item.id} {...item} variant="light" className="h-full shadow-sm hover:shadow-md" />
                ))}
            </div>
        </div>
    );
}
