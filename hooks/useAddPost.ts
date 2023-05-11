import { useMutation } from 'react-query';
import axios from 'axios';
import { API_BASE_URL } from '@/constants';
import { addPostToLocalStorage } from '@/utils';
import { Post } from '@/interfaces';

type CreatePostInput = {
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

export const useAddPost = () => {
  return useMutation<Post, Error, CreatePostInput, null>(addPost, {
    onSuccess: (newPost) => {
      addPostToLocalStorage(newPost);
      console.log(newPost)
    },
  });
};
