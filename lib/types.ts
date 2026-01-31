export type PostType = "question" | "review";

export interface Author {
    name: string;
    avatar?: string;
    badge?: string;
}

export interface PostContent {
    text: string;
    title?: string;
    rating?: number;
}

export interface PostStats {
    likes: number;
    comments: number;
    time: string;
}

export interface Post {
    id: string;
    type: PostType;
    author: Author;
    content: PostContent;
    stats: PostStats;
}
