import groq from "groq";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import client from "../client";

interface IHomeProps {
  posts: {
    _id: string;
    slug: { current: string };
    title: string;
  }[];
}

export default function Home({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="">
      <Head>
        <title>Home</title>
      </Head>

      <main className="container">
        <h1>Test</h1>
        <ul>
          {posts.map((p) => (
            <li key={p._id}>
              <Link href={`/post/${p.slug.current}`}>{p.title}</Link>
            </li>
          ))}
        </ul>
      </main>

      {/* <footer className="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2022{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Flowbite™
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              About
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </footer> */}
    </div>
  );
}

export const getStaticProps: GetStaticProps<IHomeProps> = async () => {
  const posts = await client.fetch(groq`
      *[_type == "post" && publishedAt < now()] | order(publishedAt desc)
    `);
  console.log(posts);
  return {
    props: {
      posts,
    },
  };
};
