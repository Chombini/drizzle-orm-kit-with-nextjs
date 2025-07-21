import { getPosts } from '@/lib/actions';
import PostCard from '@/components/PostCard'; // Client Component
import Link from 'next/link';

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">All Blog Posts</h1>
      <Link
        href="/posts/create"
        className="inline-block mb-6 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
      >
        Create New Post
      </Link>
      {posts.length === 0 ? (
        <p className="text-gray-600">No posts yet. Start by creating one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}