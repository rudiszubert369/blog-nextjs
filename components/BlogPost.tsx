import React, { useState } from 'react';
import { Post } from '@/interfaces';
import {
  VStack,
  HStack,
  Button,
  Heading,
  Text,
  ButtonGroup
} from '@chakra-ui/react';
import EditBlogPostModal from './EditBlogPostModal';
import { useDeletePost } from '@/hooks/useDeletePost';
import { useEditPost } from '@/hooks/useEditPost';
import Link from 'next/link';

interface BlogPostProps {
  post: Post;
  onUpdate: Function;
}

const BlogPost: React.FC<BlogPostProps> = ({ post, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedContent, setEditedContent] = useState(post.body);
  const deletePostMutation = useDeletePost();
  const editPostMutation = useEditPost();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    editPostMutation.mutateAsync(
      { id: post.id, title: editedTitle, body: editedContent },
      {
        onSuccess: () => {
          onUpdate((refresh: boolean) => !refresh);
        },
      }
    );
  };

  const handleClose = () => {
    setIsEditing(false);
    setEditedContent(post.body);
  };

  const handleDelete = () => {
    deletePostMutation.mutateAsync(post.id, {
      onSuccess: () => {
        onUpdate((refresh: boolean) => !refresh);
      },
    });
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
        '.post-buttons': {
          opacity: 1,
        },
      }}
    >
      <Link href={`/post/${post.id}`}>
        <Heading size="md" as="h3">{post.title}</Heading>
        <Text>{post.body}</Text>
      </Link>
      <HStack w="100%" justifyContent="flex-end">
        <ButtonGroup size="sm" spacing={4}>
          <Button
            className="post-buttons"
            opacity={0}
            _hover={{ opacity: 1 }}
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button
            className="post-buttons"
            opacity={0}
            _hover={{ opacity: 1, backgroundColor: 'red.600' }}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </ButtonGroup>
      </HStack>
      <EditBlogPostModal
        isOpen={isEditing}
        onClose={handleClose}
        editedContent={editedContent}
        setEditedContent={setEditedContent}
        editedTitle={editedTitle}
        setEditedTitle={setEditedTitle}
        handleSave={handleSave}
      />
    </VStack>
  );
};

export default BlogPost;
