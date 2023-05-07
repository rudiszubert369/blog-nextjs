import { useQuery } from 'react-query';
import { useState, useEffect } from 'react';

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

export const useFetchPosts = (refreshKey: number) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const storedPosts = localStorage.getItem('posts');

      if (storedPosts && JSON.parse(storedPosts).length > 0) {
        setPosts(JSON.parse(storedPosts));
      } else {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
        localStorage.setItem('posts', JSON.stringify(fetchedPosts));
      }
    };

    fetchData();
  }, [refreshKey]);

  return { posts };
};
