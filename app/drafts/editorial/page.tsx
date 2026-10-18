import type { Metadata } from "next";
import { EditorialHome } from "@/components/drafts/EditorialHome";

export const metadata: Metadata = {
    title: "시안 A · 에디토리얼 저널 | LUMIERE",
};

export default function EditorialDraftPage() {
    return <EditorialHome />;
}
