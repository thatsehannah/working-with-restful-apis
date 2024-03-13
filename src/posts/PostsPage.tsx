import { Suspense } from 'react';
import { useLoaderData, Await } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { assertIsPosts, getPosts } from './getPosts';
import { savePost } from './savePost';
import { PostData, NewPostData } from './types';
import { PostsList } from './PostsList';
import { NewPostForm } from './NewPostForm';

type Data = {
  posts: PostData[];
};

export function assertIsData(data: unknown): asserts data is Data {
  if (typeof data !== 'object') {
    throw new Error("data isn't an object");
  }
  if (data === null) {
    throw new Error('data is null');
  }

  if (!('posts' in data)) {
    throw new Error("data doesn't contain posts");
  }
}

export function PostsPage() {
  const {
    isPending,
    isFetching,
    data: posts,
  } = useQuery({
    queryKey: ['postsData'],
    queryFn: getPosts,
  });
  // const data = useLoaderData();
  // assertIsData(data);

  async function handleSave(newPostData: NewPostData) {
    await savePost(newPostData);
  }

  if (isPending || posts === undefined) {
    return <div className='w-96 mx-auto mt-6'>Loading ...</div>;
  }

  return (
    <div className='w-96 mx-auto mt-6'>
      <h2 className='text-xl text-slate-900 font-bold'>Posts</h2>
      <NewPostForm onSave={handleSave} />
      {/* <Suspense fallback={<div>Fetching...</div>}>
        <Await resolve={data.posts}>
          {(posts) => {
            assertIsPosts(posts);
            return <PostsList posts={posts} />;
          }}
        </Await>
      </Suspense> */}
      {isFetching ? <div>Fetching posts...</div> : <PostsList posts={posts} />}
    </div>
  );
}
