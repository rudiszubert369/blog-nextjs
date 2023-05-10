import React from 'react';
import { Post } from '@/interfaces';
import { Box, Heading, Flex } from '@chakra-ui/react';
import BlogPost from './BlogPost';
import { useBreakpointValue } from '@chakra-ui/react';

interface BlogListPageProps {
  posts: Post[];
  onUpdate: Function;
}

const BlogListPage: React.FC<BlogListPageProps> = ({ posts, onUpdate }) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  const uniquePosts = posts.filter((post, index, self) => {
    return self.findIndex(p => p.id === post.id) === index;
  });
  
  return (
    <Box p={4}>
      <Flex direction={isDesktop ? 'row' : 'column'} wrap="wrap" ml={-2} mr={-2}>
        {uniquePosts.map((post) => (
          <Box key={post.id} flex="1" minW={isDesktop ? '50%' : '100%'} pb={6} px={2}>
            <BlogPost post={post} onUpdate={onUpdate} />
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default BlogListPage
