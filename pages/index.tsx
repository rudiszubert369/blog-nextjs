import * as React from 'react';
import { useFetchPosts } from '../hooks/useFetchPosts';
import BlogList from '../components/BlogList';
import Layout from '@/components/Layout';
import {
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Center
} from '@chakra-ui/react';

const Home = () => {
  const [refresh, setRefresh] = React.useState(false);
  const { posts, isLoading, error } = useFetchPosts(refresh);

  const renderContent = () => {
    if (isLoading) {
      return <Center><Spinner /></Center>;
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
