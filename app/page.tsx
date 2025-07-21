import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="text-center py-10">
      <h1 className="text-4xl font-bold mb-4">Welcome to My Blog!</h1>
      <p className="text-lg text-gray-600 mb-8">Discover interesting articles and share your thoughts.</p>
      <Link href="/posts" className="bg-indigo-600 text-white px-6 py-3 rounded-md text-lg hover:bg-indigo-700">
        View All Posts
      </Link>
    </div>
  );
}