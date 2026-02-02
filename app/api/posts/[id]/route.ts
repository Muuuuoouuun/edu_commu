import { NextResponse } from 'next/server';
import { getPosts } from '@/lib/db-mock';

// Need to match the folder structure [id]
export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
    // Await the params property
    const { id } = await context.params;

    const posts = await getPosts();
    const post = posts.find(p => p.id === id);

    if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
}
