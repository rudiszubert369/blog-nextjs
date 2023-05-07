import * as React from 'react';
import { GetStaticProps } from 'next';
import { fetchPosts, Post } from '../hooks/useFetchPosts';
import BlogListPage from '../components/BlogList';

interface PostsProps {
  posts: Post[];
}

const Home = ({ posts }: PostsProps) => {
  console.log(posts)
  return <BlogListPage posts={posts} />;
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
