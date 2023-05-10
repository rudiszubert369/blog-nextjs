import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { fetchPosts } from '@/hooks/useFetchPosts';
import PostDetails from '../../components/PostDetails';
import { Post } from '@/interfaces';
import { Flex, Button } from '@chakra-ui/react';
import Layout from '@/components/Layout';
import { API_BASE_URL } from '@/constants';

const PostPage: React.FC<{ post: Post }> = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const handleBackClick = () => {
    router.back();
  };

  return (
    <Layout>
      <Flex flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
        <PostDetails post={post} />
        <Button mt={4}>Back</Button>
    </Flex>
   </Layout>
  );
};

export default PostPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetchPosts();

  const paths = posts.map((post) => ({ params: { id: post.id } }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as { id: string };

  // Check if the post id exists in local storage
  const postFromLocalStorage = localStorage.getItem(`post-${id}`);
  if (postFromLocalStorage) {
    return {
      props: { post: JSON.parse(postFromLocalStorage) },
    };
  }

  // Otherwise, make an API call to fetch the post
  const post = await fetchPost(id);

  // Store the post object in local storage
  localStorage.setItem(`post-${id}`, JSON.stringify(post));

  return {
    props: { post },
  };
};


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
