import { Post } from "@/interfaces";

export const editPostInLocalStorage = (updatedPost: Post) => {
  try {
    const storedPosts = localStorage.getItem('posts');

    if (storedPosts) {
      const posts = JSON.parse(storedPosts) as Post[];
      const postIndex = posts.findIndex(post => post.id === updatedPost.id);

      if (postIndex !== -1) {
        posts[postIndex] = updatedPost;
        localStorage.setItem('posts', JSON.stringify(posts));
      }
    }
  } catch (error) {
    console.error('Failed to edit post in local storage', error);
  }
};

export const deletePostFromLocalStorage = (id: string) => {
  try {
    const storedPosts = localStorage.getItem('posts');

    if (storedPosts) {
      const posts = JSON.parse(storedPosts) as Post[];
      const updatedPosts = posts.filter(post => post.id !== id);
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
    }
  } catch (error) {
    console.error('Failed to delete post from local storage', error);
  }
};

export const addPostToLocalStorage = (newPost: Post) => {
  try {
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      const posts = JSON.parse(storedPosts) as Post[];
      const randomId = Math.floor(Math.random() * 999999) + 1;//not the greatest solution
      const updatedNewPost = { ...newPost, id: randomId.toString() };
      posts.push(updatedNewPost);
      localStorage.setItem('posts', JSON.stringify(posts));
    } else {
      localStorage.setItem('posts', JSON.stringify([newPost]));
    }
  } catch (error) {
    console.error('Failed to add post to local storage', error);
  }
};