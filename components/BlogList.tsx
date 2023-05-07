import React from 'react';
import { Post } from '../hooks/useFetchPosts';
import { Box, Heading, Flex } from '@chakra-ui/react';
import BlogPost from './BlogPost';
import { useBreakpointValue } from '@chakra-ui/react';

interface BlogListPageProps {
  posts: Post[];
}

const BlogListPage: React.FC<BlogListPageProps> = ({ posts }) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  return (
    <Box p={4}>
      <Heading mb={6}>Blog</Heading>
      <Flex direction={isDesktop ? 'row' : 'column'} wrap="wrap" ml={-2} mr={-2}>
        {posts.map((post) => (
          <Box key={post.id} flex="1" minW={isDesktop ? '50%' : '100%'} pb={6} px={2}>
            <BlogPost post={post} />
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default BlogListPage
