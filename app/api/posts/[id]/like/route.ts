import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getPosts, updatePost } from '@/lib/db-mock';

export async function POST(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    const { id } = await context.params;

    const userId = session?.user?.email ?? (await request.json().catch(() => ({}))).guestId ?? 'guest';

    const posts = await getPosts();
    const post = posts.find((p) => p.id === id);

    if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const likedBy: string[] = post.likedBy ?? [];
    const alreadyLiked = likedBy.includes(userId);

    if (alreadyLiked) {
        post.likedBy = likedBy.filter((u) => u !== userId);
        post.stats.likes = Math.max(0, post.stats.likes - 1);
    } else {
        post.likedBy = [...likedBy, userId];
        post.stats.likes += 1;
    }

    await updatePost(post);

    return NextResponse.json({
        liked: !alreadyLiked,
        likes: post.stats.likes,
    });
}
