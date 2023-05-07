import { useQuery } from 'react-query';

export interface User {
  id: string;
  name: string;
}

export interface Post {
  id: string;
  title: string;
  body: string;
  user: User;
}

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch("https://graphqlzero.almansi.me/api", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      query: `{
        posts {
          data {
            id
            title
            body
            user {
              id
              name
            }
          }
        }
      }`,
    }),
  });

  const { data } = await response.json();
  return data.posts.data;
};

export const useFetchPosts = () => {
  return useQuery<Post[], Error>('posts', fetchPosts);
};
