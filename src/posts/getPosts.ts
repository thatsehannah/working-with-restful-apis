import { PostData } from './types';

export const getPosts = async () => {
  const response = await fetch(process.env.REACT_APP_API_URL!);
  const data = (await response.json()) as unknown;
  assertIsPosts(data);
  return data;
};

//type assertion function to type the response data in the getPosts function
//i'm not using an arrow function here because the syntax doesn't make sense to me (might
//consider using function definitions going forward to be consistent)
export function assertIsPosts(
  postsData: unknown
): asserts postsData is PostData[] {
  if (!Array.isArray(postsData)) {
    throw new Error("posts isn't an array");
  }

  if (postsData.length === 0) {
    return;
  }

  postsData.forEach((post) => {
    if (!('id' in post)) {
      throw new Error("post doesn't contain uid");
    }
    if (typeof post.id !== 'string') {
      throw new Error('uid is not a number');
    }

    if (!('title' in post)) {
      throw new Error("post doesn't contain title");
    }
    if (typeof post.title !== 'string') {
      throw new Error('title is not a string');
    }

    if (!('description' in post)) {
      throw new Error("post doesn't contain description");
    }
    if (typeof post.description !== 'string') {
      throw new Error('description is not a string');
    }
  });
}
