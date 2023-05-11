import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Post } from '@/interfaces';
import { useRouter } from 'next/router';
import { Flex, Button } from '@chakra-ui/react';
import PostDetails from '../../components/PostDetails';
import Layout from '@/components/Layout';
import { API_BASE_URL } from '@/constants';
import { 
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle
} from '@chakra-ui/react';
import { useFetchSinglePost } from '@/hooks/useFetchSinglePost';

const PostPage = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const postId = router.query.slug;

  useEffect(() => {
    const fetchAndSetPost = async () => {
      setIsLoading(true);
      const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
      const storedPost = storedPosts.find((post:Post) => post.id === postId);

      if (storedPost) {
        setPost(storedPost);
        setIsLoading(false);
      } else {
        try {
          if (typeof postId === 'string') {
            const fetchedPost = await fetchPost(postId);

            if (fetchedPost) {
              setPost(fetchedPost);
              localStorage.setItem('posts', JSON.stringify([...storedPosts, fetchedPost]));
            } else {
              setError(true);
            }
          }
        } catch (err) {
          console.error('Error fetching post:', err);
          setError(true);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchAndSetPost();
  }, [postId]);

  const handleBackClick = () => {
    router.push('/');
  };

  return (
    <>
       <Head>
        <title>Post {post && post.id ? post.id : 'unknown' }</title>
      </Head>
      <Layout>
        <Flex flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
          {isLoading ? <Spinner /> : post ? <PostDetails post={post} /> : null}
          {error && !isLoading && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>Error fetching post</AlertTitle>
            </Alert>
          )}
          <Button mt={4} onClick={handleBackClick}>Home</Button>
        </Flex>
      </Layout>
    </>
  );
};

export default PostPage;


export const fetchPost = async (id: string): Promise<Post> => {
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
};
