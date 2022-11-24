# Podatkovno inženirstvo in distribuirani informacijski sistemi
### Project seminar
### Matic Adamič, 89202071

## Sticky notes in Nextjs

## 1. About Nextjs
Nextjs is relatively new Javascript/Typescript framework, built on top of the Reactjs framework. It has been in development sice late 2016, by Vercel.

It is both a front-end and a back-end framework (full-stack). It offers server-side rendering as well as simple static pages. It offers a simplified abstraction for easier developmet of operations such: data fetching and routing.

Since it is a full-stack framework, it’s possible to have both the API, font-end and back-end code in the same project. Some of the code will be executed in the browser on client-side, and the API call consumers are executed on the server-side, for example, database queries and caching.

Some of the cons is that it is a new framework. New versions are subject to braking changes. It is also reported that state management is lacking, meaning you have to bring in other state managing libraries that do it for you.

## 2. Sticky notes
Simple website about posting notes. Users are free to browse public notes or create them themselves. Registration is possible. When a registered user creates a new note, he can choose to share it with a list of other registered users, or just post it publicly. Notes posted by registered users can be edited or they can modify the users which can see the note. 
Public notes can not be edited or deleted after posting. Each note will have a TTL, and will be deleted after that time.


## ----- NextJs default README -----

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
