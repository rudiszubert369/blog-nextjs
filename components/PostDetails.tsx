import { Post } from '@/interfaces';
import {
  Heading,
  Text,
  VStack,
  HStack,
  Tag,
  useColorModeValue,
} from "@chakra-ui/react";

interface PostDetailsProps {
  post: Post;
}

const PostDetails: React.FC<PostDetailsProps> = ({ post }) => {
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <VStack
      align="start"
      spacing={4}
      w="100%"
      p={4}
      borderWidth={1}
      borderRadius="lg"
      borderColor={borderColor}
      boxShadow="md"
    >
      <Heading size="lg">{post.title}</Heading>
      <Text>{post.body}</Text>
      <HStack spacing={2}>
        <Tag size="md" colorScheme="blue">
          {post.user.name}
        </Tag>
        <Tag size="md" colorScheme="green">
          ID: {post.id}
        </Tag>
      </HStack>
    </VStack>
  );
};

export default PostDetails;
