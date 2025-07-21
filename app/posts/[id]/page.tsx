import { getPostById, getCommentsByPostId } from '@/lib/actions'; // Import getCommentsByPostId
import { notFound } from 'next/navigation';
import Link from 'next/link';
import CommentForm from '@/components/CommentForm'; // Import CommentForm
import CommentCard from '@/components/CommentCard'; // Import CommentCard

interface SinglePostPageProps {
  params: {
    id: string;
  };
}

export default async function SinglePostPage({ params }: SinglePostPageProps) {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    alert("Not found")
  }

  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  const comments = await getCommentsByPostId(id); // Fetch comments for this post

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
      <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
      <div className="mt-6 text-sm text-gray-500">
        Created at: {new Date(post.createdAt).toLocaleDateString()}
        {post.updatedAt && post.createdAt.getTime() !== post.updatedAt.getTime() && (
          <span> | Last updated: {new Date(post.updatedAt).toLocaleDateString()}</span>
        )}
      </div>
      <div className="mt-6 flex space-x-4">
        <Link
          href={`/posts/${post.id}/edit`}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Edit Post
        </Link>
        <Link
          href="/posts"
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
        >
          Back to Posts
        </Link>
      </div>

      {/* Comments Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Comments ({comments.length})</h2>
        {comments.length === 0 ? (
          <p className="text-gray-600">No comments yet. Be the first to comment!</p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} postId={post.id} />
            ))}
          </div>
        )}

        {/* Comment Form */}
        <CommentForm postId={post.id} />
      </div>
    </div>
  );
}