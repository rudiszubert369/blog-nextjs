// import * as React from 'react';
// import BlogListPage from '../components/BlogList';

// function Home() {
//   return <BlogListPage />;

// }

// export default Home;
import * as React from 'react';
import { GetStaticProps } from 'next';
import { fetchPosts, Post } from '../hooks/useFetchPosts';
import { useAddPost } from '@/hooks/useAddPost';
import { useDeletePost } from '@/hooks/useDeletePost';
import { useEditPost } from '@/hooks/useEditPost';

interface PostsProps {
  posts: Post[];
}

const Home = ({ posts }: PostsProps) => {
  return (
    <div>
      
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<PostsProps> = async () => {
  const posts = await fetchPosts();

  return {
    props: {
      posts,
    },
    revalidate: 60,
  };
};
