import PostForm from '@/components/PostForm';
import { getPostById } from '@/lib/actions';
import { notFound } from 'next/navigation';

interface EditPostPageProps {
  params: {
    id: string;
  };
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    notFound();
  }

  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
      <PostForm initialPost={post} />
    </div>
  );
}