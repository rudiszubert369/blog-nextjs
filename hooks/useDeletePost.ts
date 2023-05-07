import { useMutation } from 'react-query';
import axios from 'axios';

const deletePost = async (id: string): Promise<string> => {
  const response = await axios.post('https://graphqlzero.almansi.me/api', {
    query: `
      mutation DeletePost($id: ID!) {
        deletePost(id: $id)
      }
    `,
    variables: { id },
  });

  return response.data.data.deletePost;
};

export const useDeletePost = () => {
  return useMutation(deletePost);
};
