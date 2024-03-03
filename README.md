Tubeify is a web application built with the latest version of Next.js, Tailwind CSS, and Shadcn UI. Its primary objective is to summarize YouTube videos, helping students like Mayank (one of the team members) save time and learn more effectively.

The current version of Tubeify is in beta, utilizing the OpenAI API for its functionality. The original version uses a custom finetuned LLM for this particular usecase only. Here's the [github link](https://github.com/TusharPuri10/Tubeify-Django-Version). 

Users can input YouTube video URLs, and Tubeify will provide concise summaries, allowing them to grasp the essential content of the videos efficiently.

## Features
* Summarize YouTube videos
* Beta version utilizing OpenAI API
* Built with Next.js, Tailwind CSS, and Shadcn UI

## Getting Started

First, install the dependencies:
```bash
npm install
```

then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
