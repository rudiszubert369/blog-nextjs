import { useMutation } from 'react-query';
import axios from 'axios';
import { API_BASE_URL } from '@/constants';

type CreatePostInput = {
  title: string;
  body: string;
};

type Post = {
  id: string;
  title: string;
  body: string;
};

const addPost = async (input: CreatePostInput): Promise<Post> => {
  try {
    const response = await axios.post(API_BASE_URL!, {
      query: `
        mutation CreatePost($input: CreatePostInput!) {
          createPost(input: $input) {
            id
            title
            body
          }
        }
      `,
      variables: { input },
    });

    return response.data.data.createPost;
  } catch (error) {
    throw new Error('Failed to add post');
  }
};

const addPostToLocalStorage = (newPost: Post) => {
  try {
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      const posts = JSON.parse(storedPosts) as Post[];
      const randomId = Math.floor(Math.random() * 999999) + 1;//not the greatest solution
      const updatedNewPost = { ...newPost, id: randomId.toString() };
      posts.push(updatedNewPost);
      localStorage.setItem('posts', JSON.stringify(posts));
    } else {
      localStorage.setItem('posts', JSON.stringify([newPost]));
    }
  } catch (error) {
    console.error('Failed to add post to local storage', error);
  }
};

export const useAddPost = () => {
  return useMutation<Post, Error, CreatePostInput, null>(addPost, {
    onSuccess: (newPost) => {
      addPostToLocalStorage(newPost);
    },
  });
};
