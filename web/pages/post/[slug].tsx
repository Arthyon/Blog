import groq from "groq";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import imageUrlBuilder from "@sanity/image-url";
import Head from "next/head";
import client from "../../client";
import Layout from "@components/Layout";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import RichText from "@components/RichText";

interface IPostProps {
  post: {
    title: string;
    name: string;
    body: [];
    categories: string[];
    authorImage: SanityImageSource;
  };
}
type ContextParams = {
  slug: string;
};

function urlFor(source: SanityImageSource) {
  return imageUrlBuilder(client).image(source);
}

const Post = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!post) {
    return <div>404</div>;
  }
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <h1>{post.title}</h1>
      {post.categories && (
        <ul>
          Posted in
          {post.categories.map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
      )}
      <p>By {post.name}</p>
      {post.authorImage && (
        <div>
          <img src={urlFor(post.authorImage).width(50).url()} />
        </div>
      )}
      <RichText body={post.body} />
    </Layout>
  );
};

export async function getStaticPaths() {
  const paths = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug: any) => ({ params: { slug } })),
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps<IPostProps, ContextParams> = async (
  context
) => {
  if (!context.params) {
    return { notFound: true };
  }
  const { slug = "" } = context.params;
  const query = groq`*[_type == "post" && slug.current == $slug]
  {
    _id,
    title,
    body,
    "categories": categories[]->title,
    "name": author->name,
    "authorImage": author->image

  }`;
  const posts = await client.fetch(query, { slug });
  if (posts.length == 0) {
    return { notFound: true };
  }
  let post =
    posts.length == 1
      ? posts[0]
      : posts.find((i: { _id: string }) => i._id.startsWith("drafts."));

  return {
    props: {
      post: post,
    },
  };
};

export default Post;
