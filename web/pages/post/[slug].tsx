import groq from "groq";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import imageUrlBuilder from "@sanity/image-url";
import Head from "next/head";
import client from "../../client";
import Layout from "@components/Layout";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import RichText from "@components/RichText";
import { IColor } from "Models/IColor";
import { IPostDetails } from "Models/IPost";
import DisplayDate from "@components/DisplayDate";

interface IPostProps {
  post: IPostDetails & {
    name: string;
    categories: { title: string; color: IColor }[];
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
      <h1 className="text-center mt-2 mb-2 text-4xl">{post.title}</h1>
      {post.mainImage && <img src={urlFor(post.mainImage).url()} />}
      <div className="mb-8 text-lg font-normal text-center lg:text-xl sm:px-16 xl:px-48 text-gray-400">
        <p>{post.name}</p>
        <DisplayDate dateString={post.publishedAt} />
      </div>
      {/* <div>
        {post.categories && (
          <ul>
            {post.categories.map((category) => (
              <li key={category.title}>
                <CategoryLabel title={category.title} color={category.color} />
              </li>
            ))}
          </ul>
        )}
      </div> */}
      <div className="mt-4 text-lg lg:mx-64">
        <p>{post.leadParagraph}</p>
        <RichText body={post.body} />
      </div>
      &nbsp;
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
    ...,
    "categories": categories[]->{title,color},
    "name": author->name,

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
