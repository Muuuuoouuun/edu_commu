import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getPosts, addPost } from '@/lib/db-mock';
import { Post } from '@/lib/types';

// Simple ID generator fallback if nanoid fails or for simplicity
const generateId = () => Math.random().toString(36).substring(2, 9);

export async function GET() {
    const posts = await getPosts();
    return NextResponse.json(posts);
}

export async function POST(request: Request) {
    const session = await auth();

    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { content, title, type } = body;

    if (!content) {
        return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    const newPost: Post = {
        id: generateId(),
        type: type || 'question',
        author: {
            name: session.user.name || 'Anonymous',
            avatar: session.user.image || undefined,
            badge: 'Newbie'
        },
        content: {
            text: content,
            title: title,
            rating: type === 'review' ? 5 : undefined // Default rating for reviews
        },
        stats: {
            likes: 0,
            comments: 0,
            time: 'Just now'
        }
    };

    await addPost(newPost);

    return NextResponse.json(newPost);
}
