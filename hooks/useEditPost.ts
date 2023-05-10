import { useMutation } from 'react-query';
import axios from 'axios';
import { Post } from '@/interfaces';
import { API_BASE_URL } from '@/constants';

const editPost = async ({ id, title, body }: { id: string, title?: string, body?: string }): Promise<Post> => {
  try {
    const response = await axios.post(API_BASE_URL!, {
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
  } catch (error) {
    throw new Error('Failed to edit post');
  }
};

const editPostInLocalStorage = (updatedPost: Post) => {
  try {
    const storedPosts = localStorage.getItem('posts');

    if (storedPosts) {
      const posts = JSON.parse(storedPosts) as Post[];
      const postIndex = posts.findIndex(post => post.id === updatedPost.id);

      if (postIndex !== -1) {
        posts[postIndex] = updatedPost;
        localStorage.setItem('posts', JSON.stringify(posts));
      }
    }
  } catch (error) {
    console.error('Failed to edit post in local storage', error);
  }
};

export const useEditPost = () => {
  return useMutation<Post, Error, { id: string, title?: string, body?: string }, null>(editPost, {
    onSuccess: (updatedPost) => {
      editPostInLocalStorage(updatedPost);
    },
  });
};
