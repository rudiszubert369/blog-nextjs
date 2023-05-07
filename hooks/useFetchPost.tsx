import { useState, useEffect } from 'react';
import { Post } from './useFetchPosts';

export const fetchPost = async (id: string): Promise<Post> => {
  const response = await fetch("https://graphqlzero.almansi.me/api", {
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
};


export const useFetchPost = (id: string) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPost = await fetchPost(id);
      setPost(fetchedPost);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  return { post, loading };
};
