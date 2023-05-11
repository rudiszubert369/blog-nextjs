import { useState, useEffect } from 'react';
import { Post } from '@/interfaces';
import { API_BASE_URL } from '@/constants';

export const useFetchSinglePost = (id: string) => {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
      const storedPost = storedPosts.find((post: Post) => post.id === id);

      if (storedPost) {
        setPost(storedPost);
        setIsLoading(false);
      } else {
        try {
          const fetchedPost = await fetchPostFromAPI(id);

          if (fetchedPost) {
            setPost(fetchedPost);
            localStorage.setItem('posts', JSON.stringify([...storedPosts, fetchedPost]));
          } else {
            setError(true);
          }
          setError(false);

        } catch (err) {
          console.error('Error fetching post:', err);
          console.error(err);
          setError(true);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchPost();
  }, [id]);

  return { post, isLoading, error };
};

const fetchPostFromAPI = async (id: string): Promise<Post> => {
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

  console.log(data)

  return data.post;
};
