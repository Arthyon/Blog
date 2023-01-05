import groq from "groq";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import client from "../../client";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

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

const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <img
          alt={value.alt || " "}
          loading="lazy"
          src={urlFor(value)
            // .width(320)
            // .height(240)
            // .fit("max")
            // .auto("format")
            .url()}
        />
      );
    },
  },
};

const Post = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!post) {
    return <div>404</div>;
  }
  return (
    <div className="container">
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
      <PortableText value={post.body} components={ptComponents} />
    </div>
  );
};

export async function getStaticPaths() {
  const paths = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  );

  console.log("PATHS", paths);
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
  const query = groq`*[_type == "post" && slug.current == $slug][0]{
    title,
    body,
    "categories": categories[]->title,
    "name": author->name,
    "authorImage": author->image

  }`;
  const post = await client.fetch(query, { slug });
  return {
    props: {
      post,
    },
  };
};

export default Post;
