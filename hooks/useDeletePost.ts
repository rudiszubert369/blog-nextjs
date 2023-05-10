import { useMutation } from 'react-query';
import axios from 'axios';
import { Post } from '@/interfaces';
import { API_BASE_URL } from '@/constants';

const deletePost = async (id: string): Promise<string> => {
  try {
    const response = await axios.post(API_BASE_URL!, {
      query: `
        mutation DeletePost($id: ID!) {
          deletePost(id: $id)
        }
      `,
      variables: { id },
    });

    return response.data.data.deletePost;
  } catch (error) {
    throw new Error('Failed to delete post');
  }
};

const deletePostFromLocalStorage = (id: string) => {
  try {
    const storedPosts = localStorage.getItem('posts');

    if (storedPosts) {
      const posts = JSON.parse(storedPosts) as Post[];
      const updatedPosts = posts.filter(post => post.id !== id);
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
    }
  } catch (error) {
    console.error('Failed to delete post from local storage', error);
  }
};

export const useDeletePost = () => {
  return useMutation<string, Error, string, null>(deletePost, {
    onSuccess: (_, id) => {
      deletePostFromLocalStorage(id);
    },
  });
};
