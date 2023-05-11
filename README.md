# NextJS Blog Post Application

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This application is a blog post system built with Next.js. It leverages the power of several technologies including GraphQL, Chakra UI, and tanstack/react-query. 

## Features

- GraphQL: This was used for managing the data fetching from the API. 
- Chakra UI: This was used for the UI components of the application. 
- tanstack/react-query: This was used to manage asynchronous data fetching.
- LocalStorage: As the API used in this project is a fake API, LocalStorage is used to act as state management. This allows for the changes made to the blog to be saved and displayed persistently, as fake API doesn't provide function to display the mutated data. 

## Time Spent

The total time spent on this project was approximately 8 hours. 

- Setting up Chakra UI and GraphQL took around 4 hours.
- Setting up LocalStorage and enabling mutations took another 4 hours, as it turned out to be a bit tricky.

## Limitations and Future Improvements

Due to time constraints, there are a few features that I didn't include:

- Testing: Under normal circumstances, I would often aim for 80% components/hooks/functions coverage.
- Input validation: The application could benefit from better input validation.

These features will be included in future iterations of the application.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



