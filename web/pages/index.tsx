import groq from "groq";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import client from "../client";
import Layout from "@components/Layout";
import Post, { IPost } from "@components/Post";

interface IHomeProps {
  content: {
    title: string;
    subtitle: string;
  };
  posts: IPost[];
}

export default function Home({
  content,
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Head>
        <title>{content.title}</title>
      </Head>

      <section className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-white">
          {content.title}
        </h1>
        <div className="mb-8 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-400">
          {content.subtitle}
        </div>
        <ul className="grid justify-items-stretch">
          {posts.map((p) => (
            <Post key={p._id} post={p}></Post>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<IHomeProps> = async () => {
  const content = await client.fetch(groq`*[_type == "landingPage"][0]`);
  const posts =
    content.postCount == 0
      ? []
      : await client.fetch(
          groq`*[_type == "post" && publishedAt < now()] | order(publishedAt desc)[0..$count]`,
          { count: content.postCount - 1 }
        );
  return {
    props: {
      content,
      posts,
    },
  };
};
