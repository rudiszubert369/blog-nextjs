export  interface Post {
  id: string;
  title: string;
  body: string;
  user: User;
}

export interface User {
  id: string;
  name: string;
}