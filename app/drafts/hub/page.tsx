import type { Metadata } from "next";
import { HubHome } from "@/components/drafts/HubHome";

export const metadata: Metadata = {
    title: "시안 B · 커뮤니티 허브 | LUMIERE",
};

export default function HubDraftPage() {
    return <HubHome />;
}
