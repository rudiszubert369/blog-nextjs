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

const editPostInLocalStorage = (updatedPost: Post) => {
  const storedPosts = localStorage.getItem('posts');

  if (storedPosts) {
    const posts = JSON.parse(storedPosts) as Post[];
    const postIndex = posts.findIndex(post => post.id === updatedPost.id);

    if (postIndex !== -1) {
      posts[postIndex] = updatedPost;
      localStorage.setItem('posts', JSON.stringify(posts));
    }
  }
};

export const useEditPost = () => {
  return useMutation<Post, Error, { id: string, title?: string, body?: string }, null>(editPost, {
    onSuccess: (updatedPost) => {
      editPostInLocalStorage(updatedPost);
    },
  });
};
