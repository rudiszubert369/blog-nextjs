import { useState, useEffect } from 'react';
import { Post } from '@/interfaces';
import { API_BASE_URL } from '@/constants';

export const fetchPost = async (id: string): Promise<Post> => {
  try {
    const response = await fetch(API_BASE_URL!, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        query: `{
          post(id: ${id}) {
            id
            title
            body
            user {
              id
              name
            }
          }
        }`,
      }),
    });

    const { data } = await response.json();
    return data.post;
  } catch (error) {
    throw new Error('Failed to fetch post');
  }
};

export const useFetchPost = (id: string) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPost = await fetchPost(id);
        setPost(fetchedPost);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { post, loading, error };
};
