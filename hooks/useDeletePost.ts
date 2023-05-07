import { useMutation } from 'react-query';
import axios from 'axios';
import { Post } from './useFetchPosts';

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

const deletePostFromLocalStorage = (id: string) => {
  const storedPosts = localStorage.getItem('posts');

  if (storedPosts) {
    const posts = JSON.parse(storedPosts) as Post[];
    const updatedPosts = posts.filter(post => post.id !== id);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  }
};

export const useDeletePost = () => {
  return useMutation<string, Error, string, null>(deletePost, {
    onSuccess: (_, id) => {
      deletePostFromLocalStorage(id);
    },
  });
};
