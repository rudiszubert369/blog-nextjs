import * as React from 'react';
import { useRouter } from 'next/router';
import { useFetchPosts } from '../hooks/useFetchPosts';
import BlogList from '../components/BlogList';
import Layout from '@/components/Layout';
import { Spinner, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';

const Home = () => {
  const [refresh, setRefresh] = React.useState(false);
  const { posts, isLoading, error } = useFetchPosts(refresh);
  const router = useRouter();

  console.log('render')
  // React.useEffect(() => {
  //   setRefresh((prev) => !prev);
  // }, [router.asPath]);

  const renderContent = () => {
    if (isLoading) {
      return <Spinner />;
    }

    if (error) {
      return (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>Error fetching posts</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      );
    }

    return <BlogList posts={posts} onUpdate={setRefresh} />;
  };

  return <Layout>{renderContent()}</Layout>;
};

export default Home;
