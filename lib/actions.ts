'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/db/drizzle';
import { posts, comments } from '@/db/schema'; // Import comments
import { eq, desc } from 'drizzle-orm';
import { Post, Comment, CommentInput } from '@/types';

// Type for a Post (for client-side usage)
export type PostInput = {
  title: string;
  content: string;
};

// CREATE
export async function createPost(post: PostInput) {
  await db.insert(posts).values(post);
  revalidatePath('/posts'); // Revalidate the posts list page
}

// READ (All Posts)
export async function getPosts(): Promise<Post[]> {
  const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));
  return allPosts;
}

// READ (Single Post)
export async function getPostById(id: number): Promise<Post | undefined> {
  const post = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  return post[0]; // Returns the first item or undefined
}

// UPDATE
export async function updatePost(id: number, updatedPost: PostInput) {
  await db.update(posts).set(updatedPost).where(eq(posts.id, id));
  revalidatePath(`/posts/${id}`); // Revalidate the single post page
  revalidatePath('/posts'); // Revalidate the list page in case title/content changed
}

// DELETE
export async function deletePost(id: number) {
  await db.delete(posts).where(eq(posts.id, id));
  revalidatePath('/posts'); // Revalidate the posts list page
}

// === COMMENT ACTIONS ===

// CREATE Comment
export async function createComment(commentData: CommentInput) {
  // Ensure postId is a number if it's coming from a form
  if (typeof commentData.postId === 'string') {
    commentData.postId = parseInt(commentData.postId, 10);
  }

  await db.insert(comments).values(commentData);
  // Revalidate the single post page where comments are displayed
  revalidatePath(`/posts/${commentData.postId}`);
}

// READ Comments for a specific post
// We use the 'with' clause here due to the relations defined in schema.ts
export async function getCommentsByPostId(postId: number): Promise<Comment[]> {
  const result = await db.query.posts.findFirst({
    where: eq(posts.id, postId),
    with: {
      comments: {
        orderBy: desc(comments.createdAt),
      },
    },
  });
  return result?.comments || [];
}

// Optional: DELETE Comment
export async function deleteComment(commentId: number, postId: number) {
  await db.delete(comments).where(eq(comments.id, commentId));
  revalidatePath(`/posts/${postId}`); // Revalidate the post page to update comments
}