'use client';

import { Comment } from '@/types';
import { deleteComment } from '@/lib/actions';

interface CommentCardProps {
  comment: Comment;
  postId: number; // Need post ID to revalidate correct page
}

export default function CommentCard({ comment, postId }: CommentCardProps) {
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this comment?')) {
      await deleteComment(comment.id, postId);
    }
  };

  return (
    <div className="border border-gray-200 p-4 rounded-lg bg-white shadow-sm mb-4">
      <p className="text-gray-800">{comment.content}</p>
      <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
        <span>
          By <strong className="text-gray-700">{comment.author}</strong> on{' '}
          {new Date(comment.createdAt).toLocaleDateString()}
        </span>
        <button onClick={handleDelete} className="text-red-500 hover:underline text-xs">
          Delete
        </button>
      </div>
    </div>
  );
}