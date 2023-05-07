import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Flex,
  useBreakpointValue,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';

interface Post {
  id: number;
  title: string;
  content: string;
}

const mockPosts: Post[] = [
  {
    id: 1,
    title: 'Post 1',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros...',
  },
  {
    id: 2,
    title: 'Post 2',
    content: 'Pellentesque sed laoreet erat, at tincidunt odio. Fusce ullamcorper pretium...',
  },
  {
    id: 3,
    title: 'Post 3',
    content: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere...',
  },
  {
    id: 4,
    title: 'Post 4',
    content: 'Nulla facilisi. Donec semper vulputate lorem, ut tempor sapien auctor...',
  },
];

interface BlogPostProps {
  post: Post;
}


const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleClose = () => {
    setIsEditing(false);
    setEditedContent(post.content);
  };

  return (
    <VStack
      align="start"
      spacing={4}
      w="100%"
      position="relative"
      p={4}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="md"
      _hover={{
        boxShadow: 'lg',
        cursor: 'pointer',
      }}
    >
      <Button
        position="absolute"
        top={2}
        right={2}
        size="sm"
        onClick={handleEdit}
      >
        Edit
      </Button>
      <Heading size="md">{post.title}</Heading>
      <Text>{post.content}</Text>

      <Modal isOpen={isEditing} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Content</FormLabel>
              <Input
                type="text"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <Button mt={4} onClick={handleSave}>
            Save
          </Button>
        </ModalContent>
      </Modal>
    </VStack>
  );
};
const BlogListPage: React.FC = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  return (
    <Box p={4}>
      <Heading mb={6}>Blog</Heading>
      <Flex direction={isDesktop ? 'row' : 'column'} wrap="wrap">
        {mockPosts.map((post) => (
          <Box key={post.id} flex="1" minW={isDesktop ? '50%' : '100%'} pb={6}>
            <BlogPost post={post} />
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default BlogListPage;
