import { useState, useEffect } from 'react';
import { Post } from '@/interfaces';
import { API_BASE_URL } from '@/constants';

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch(API_BASE_URL!, {
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

export const useFetchPosts = (refresh: boolean) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedPosts = localStorage.getItem('posts');

        if (storedPosts && storedPosts !== "undefined" && JSON.parse(storedPosts).length > 0) {
          setPosts(JSON.parse(storedPosts));
        } else {
          const fetchedPosts = await fetchPosts();
          setPosts(fetchedPosts);
          localStorage.setItem('posts', JSON.stringify(fetchedPosts));
        }
        setIsLoading(false);
      } catch (error) {
        setError(error as Error);
      }
    };

    fetchData();
  }, [refresh]);

  return { posts, error, isLoading };
};
