import React, { useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useAddPost } from '@/hooks/useAddPost';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();
  const addPostMutation = useAddPost();

  const handleSave = () => {
    addPostMutation.mutate({ title, body: content });
    router.push('/');
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <Box p={4}>
      <Heading mb={6}>Create New Post</Heading>
      <VStack spacing={4} align="center">
        <Box width={['100%', '80%', '60%']}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
        </Box>
        <Box width={['100%', '80%', '60%']}>
          <FormControl>
            <FormLabel>Content</FormLabel>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </FormControl>
        </Box>
        <Box>
          <Button mr={2} onClick={handleSave}>
            Save
          </Button>
          <Button onClick={handleBack}>Back</Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default CreatePostPage;
