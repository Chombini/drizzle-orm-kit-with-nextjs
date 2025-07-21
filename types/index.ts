import { InferSelectModel, InferInsertModel } from 'drizzle-orm'; // Import InferInsertModel
import { posts, comments } from '@/db/schema'; // Import comments

export type Post = InferSelectModel<typeof posts>;
export type Comment = InferSelectModel<typeof comments>;

// For creating a new comment
export type CommentInput = InferInsertModel<typeof comments>;