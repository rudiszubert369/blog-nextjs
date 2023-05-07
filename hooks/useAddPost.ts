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

const addPostToLocalStorage = (newPost: Post) => {
  const storedPosts = localStorage.getItem('posts');

  if (storedPosts) {
    const posts = JSON.parse(storedPosts) as Post[];
    posts.push(newPost);
    localStorage.setItem('posts', JSON.stringify(posts));
  } else {
    localStorage.setItem('posts', JSON.stringify([newPost]));
  }
};

export const useAddPost = () => {
  return useMutation<Post, Error, CreatePostInput, null>(addPost, {
    onSuccess: (newPost) => {
      addPostToLocalStorage(newPost);
    },
  });
};