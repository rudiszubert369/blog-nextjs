import { useMutation } from 'react-query';
import axios from 'axios';
import { Post } from './useFetchPosts';

const editPost = async ({ id, title, body }: { id: string, title?: string, body?: string }): Promise<Post> => {
  const response = await axios.post('https://graphqlzero.almansi.me/api', {
    query: `
      mutation EditPost($id: ID!, $title: String, $body: String) {
        updatePost(id: $id, input: { title: $title, body: $body }) {
          id
          title
          body
          user {
            id
            name
          }
        }
      }
    `,
    variables: { id, title, body },
  });

  return response.data.data.updatePost;
};

export const useEditPost = () => {
  return useMutation(editPost);
};
