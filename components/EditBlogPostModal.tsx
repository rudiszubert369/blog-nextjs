import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea
} from '@chakra-ui/react';

interface BlogPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  editedTitle: string;
  setEditedTitle: (title: string) => void;
  editedContent: string;
  setEditedContent: (content: string) => void;
  handleSave: () => void;
}

const BlogPostModal: React.FC<BlogPostModalProps> = ({
  isOpen,
  onClose,
  editedTitle,
  setEditedTitle,
  editedContent,
  setEditedContent,
  handleSave,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Content</FormLabel>
            <Textarea
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
  );
};

export default BlogPostModal;
