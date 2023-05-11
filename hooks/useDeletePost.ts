import { useMutation } from 'react-query';
import axios from 'axios';
import { deletePostFromLocalStorage } from '@/utils';
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

export const useDeletePost = () => {
  return useMutation<string, Error, string, null>(deletePost, {
    onSuccess: (_, id) => {
      deletePostFromLocalStorage(id);
    },
  });
};
