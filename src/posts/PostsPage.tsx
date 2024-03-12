import { useLoaderData } from 'react-router-dom';
import { assertIsPosts } from './getPosts';
import { savePost } from './savePost';
import { PostData, NewPostData } from './types';
import { PostsList } from './PostsList';
import { NewPostForm } from './NewPostForm';

export function PostsPage() {
  const posts = useLoaderData();
  assertIsPosts(posts);

  async function handleSave(newPostData: NewPostData) {
    await savePost(newPostData);
  }

  return (
    <div className='w-96 mx-auto mt-6'>
      <h2 className='text-xl text-slate-900 font-bold'>Posts</h2>
      <NewPostForm onSave={handleSave} />
      <PostsList posts={posts} />
    </div>
  );
}
