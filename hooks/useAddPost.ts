import { useMutation } from 'react-query';
import axios from 'axios';

type CreatePostInput = {
  title: string;
  body: string;
};

type Post = {
  id: number;
  title: string;
  body: string;
};

const addPost = async (input: CreatePostInput): Promise<Post> => {
  const response = await axios.post('https://graphqlzero.almansi.me/api', {
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
};

export const useAddPost = () => {
  return useMutation(addPost);
};