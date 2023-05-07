import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Post, fetchPosts } from '@/hooks/useFetchPosts';
import PostDetails from '../../components/PostDetails';

const PostPage: React.FC<{ post: Post }> = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <PostDetails post={post} />
    </div>
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

  const post = await fetchPost(id);

  return {
    props: { post },
  };
};

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
