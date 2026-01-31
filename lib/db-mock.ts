import fs from 'fs/promises';
import path from 'path';
import { Post } from './types';

const dataFilePath = path.join(process.cwd(), 'data', 'posts.json');

export async function getPosts(): Promise<Post[]> {
    try {
        const data = await fs.readFile(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

export async function addPost(post: Post): Promise<void> {
    const posts = await getPosts();
    // Prepend new post
    const updatedPosts = [post, ...posts];
    await fs.writeFile(dataFilePath, JSON.stringify(updatedPosts, null, 2));
}
