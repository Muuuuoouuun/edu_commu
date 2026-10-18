import type { Metadata } from "next";
import { WhiteHome } from "@/components/drafts/WhiteHome";

export const metadata: Metadata = {
    title: "시안 C · 화이트 프리미엄 | LUMIERE",
};

export default function WhiteDraftPage() {
    return <WhiteHome />;
}
