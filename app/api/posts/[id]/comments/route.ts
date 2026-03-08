import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getComments, addComment } from '@/lib/db-mock';
import { Comment } from '@/lib/types';

function generateId() {
    return Math.random().toString(36).substring(2, 10);
}

export async function GET(
    _request: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;
    const comments = await getComments(id);
    return NextResponse.json(comments);
}

export async function POST(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    const { id } = await context.params;

    const body = await request.json();
    const { text } = body;

    if (!text?.trim()) {
        return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const authorName = session?.user?.name ?? '익명';
    const authorAvatar = session?.user?.image ?? undefined;

    const comment: Comment = {
        id: generateId(),
        postId: id,
        author: {
            name: authorName,
            avatar: authorAvatar,
        },
        text: text.trim(),
        time: 'Just now',
        likes: 0,
        createdAt: new Date().toISOString(),
    };

    await addComment(comment);

    return NextResponse.json(comment);
}
