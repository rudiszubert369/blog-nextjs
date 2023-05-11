import { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Flex, Heading, Spacer, Button } from '@chakra-ui/react';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>My Blog App</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Flex bg="gray.100" p={4}>
          <Link href='/'>
            <Heading size="lg" as="h1">
              My Blog App
            </Heading>
          </Link>
          <Spacer />
          <Link href='/new-post/'>
            <Button colorScheme="teal" mr={4}>
              Add New Post
            </Button>
          </Link>
        </Flex>
      </header>
      <Flex direction="column" maxW="960px" mx="auto" p={4}>
        <main>
         {children}
        </main>
      </Flex>
    </>
  );
};

export default Layout;
