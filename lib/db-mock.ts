import fs from 'fs/promises';
import path from 'path';
import { Post, Comment } from './types';

const dataFilePath = path.join(process.cwd(), 'data', 'posts.json');
const commentsFilePath = path.join(process.cwd(), 'data', 'comments.json');

export async function getPosts(): Promise<Post[]> {
    try {
        const data = await fs.readFile(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

export async function addPost(post: Post): Promise<void> {
    const posts = await getPosts();
    const updatedPosts = [post, ...posts];
    await fs.writeFile(dataFilePath, JSON.stringify(updatedPosts, null, 2));
}

export async function updatePost(updatedPost: Post): Promise<void> {
    const posts = await getPosts();
    const index = posts.findIndex((p) => p.id === updatedPost.id);
    if (index !== -1) {
        posts[index] = updatedPost;
        await fs.writeFile(dataFilePath, JSON.stringify(posts, null, 2));
    }
}

export async function getComments(postId: string): Promise<Comment[]> {
    try {
        const data = await fs.readFile(commentsFilePath, 'utf8');
        const all: Comment[] = JSON.parse(data);
        return all.filter((c) => c.postId === postId);
    } catch {
        return [];
    }
}

export async function addComment(comment: Comment): Promise<void> {
    let all: Comment[] = [];
    try {
        const data = await fs.readFile(commentsFilePath, 'utf8');
        all = JSON.parse(data);
    } catch {
        all = [];
    }
    all.unshift(comment);
    await fs.writeFile(commentsFilePath, JSON.stringify(all, null, 2));

    // Update comment count in the post
    const posts = await getPosts();
    const post = posts.find((p) => p.id === comment.postId);
    if (post) {
        post.stats.comments = all.filter((c) => c.postId === comment.postId).length;
        await updatePost(post);
    }
}
