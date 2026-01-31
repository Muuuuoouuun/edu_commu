import { BlogSection } from "@/components/sections/BlogSection";
import { CommunitySection } from "@/components/sections/CommunitySection";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="">
                <BlogSection />
                <CommunitySection />
            </div>
        </div>
    );
}
