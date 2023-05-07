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

const CreatePostPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSave = () => {
    console.log('Title:', title);
    console.log('Content:', content);
    router.push('/');
  };

  const handleBack = () => {
    // Navigate back to the blog list or another desired page
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
