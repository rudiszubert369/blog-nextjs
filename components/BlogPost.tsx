import React, { useState } from 'react';
import { Post } from '@/hooks/useFetchPosts';
import {
  VStack,
  Button,
  Heading,
  Text,
} from '@chakra-ui/react';
import EditBlogPostModal from './EditBlogPostModal';
import { useDeletePost } from '@/hooks/useDeletePost';
import { useEditPost } from '@/hooks/useEditPost';

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
      <Button
        className="post-buttons"
        position="absolute"
        top={2}
        right={2}
        size="sm"
        opacity={0}
        _hover={{ opacity: 1 }}
        onClick={handleEdit}
      >
        Edit
      </Button>
      <Button
        className="post-buttons"
        position="absolute"
        top={2}
        right={28}
        size="sm"
        opacity={0}
        _hover={{ opacity: 1 }}
        onClick={handleDelete}
      >
        Delete
      </Button>
      <Heading size="md">{post.title}</Heading>
      <Text>{post.body}</Text>
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
