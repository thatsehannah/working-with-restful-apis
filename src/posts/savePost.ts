import { NewPostData, SavedPostData } from './types';

export async function savePost(newPostData: NewPostData) {
  const response = await fetch(process.env.REACT_APP_API_URL!, {
    method: 'POST',
    body: JSON.stringify(newPostData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const body = (await response.json()) as unknown;
  console.log('Before:', body);
  assetIsSavedPost(body);
  console.log('After:', body);
  return { ...newPostData, ...body };
}

function assetIsSavedPost(post: any): asserts post is SavedPostData {
  if (!('id' in post)) {
    throw new Error("post doesn't contain uid");
  }
  if (typeof post.id !== 'string') {
    throw new Error('uid is not a number');
  }
}
