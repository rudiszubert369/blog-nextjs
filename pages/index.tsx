import * as React from 'react';
import { useFetchPosts } from '../hooks/useFetchPosts';
import BlogListPage from '../components/BlogList';

const Home = () => {
  const [refreshKey, setRefreshKey] = React.useState(0);
  const { posts } = useFetchPosts(refreshKey);

  return <BlogListPage posts={posts} onUpdate={setRefreshKey} />;
};

export default Home;
