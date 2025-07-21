'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deletePost } from '@/lib/actions';
import { Post } from '@/types';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this post?')) {
      await deletePost(post.id);
      // No need to revalidate here as the action already does it.
      // If you're on the list page, the revalidation will update the list.
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-sm mb-4">
      <Link href={`/posts/${post.id}`}>
        <h2 className="text-xl font-semibold text-indigo-600 hover:underline">
          {post.title}
        </h2>
      </Link>
      <p className="text-gray-600 mt-2 line-clamp-3">{post.content}</p>
      <div className="mt-4 flex space-x-2">
        <Link href={`/posts/${post.id}/edit`} className="text-blue-500 hover:underline">
          Edit
        </Link>
        <button onClick={handleDelete} className="text-red-500 hover:underline">
          Delete
        </button>
      </div>
    </div>
  );
}