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
import Layout from '@/components/Layout';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();
  const addPostMutation = useAddPost();

  const handleSave = async () => {
    try {
      await addPostMutation.mutateAsync({ title, body: content });
      router.push('/');
    } catch (error) {
      console.error(error)
    }
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <Layout>
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
            <Button mr={2} onClick={handleSave} aria-label="Save New Post">
              Save
            </Button>
            <Button onClick={handleBack}>Back</Button>
          </Box>
        </VStack>
      </Box>
    </Layout>
  );
};

export default CreatePostPage;
