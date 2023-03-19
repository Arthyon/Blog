import groq from "groq";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import client from "../../client";
import Layout from "@components/Layout";
import RichText from "@components/RichText";
import { INoteDetails } from "Models/INote";

interface INoteProps {
  note: INoteDetails;
}

type ContextParams = {
  slug: string;
};

const Note = ({ note }: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!note) {
    return <div>404</div>;
  }
  return (
    <Layout>
      <Head>
        <title>{note.title}</title>
      </Head>
      <h1 className="text-center mt-2 mb-2 text-4xl">{note.title}</h1>
      <div className="mt-4 text-lg lg:mx-64">
        <RichText body={note.body} />
      </div>
      &nbsp;
    </Layout>
  );
};

export async function getStaticPaths() {
  const paths = await client.fetch(
    groq`*[_type == "note" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug: any) => ({ params: { slug } })),
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps<INoteProps, ContextParams> = async (
  context
) => {
  if (!context.params) {
    return { notFound: true };
  }
  const { slug = "" } = context.params;
  const query = groq`*[_type == "note" && slug.current == $slug]`;

  const notes = await client.fetch(query, { slug });
  if (notes.length == 0) {
    return { notFound: true };
  }
  let note =
    notes.length == 1
      ? notes[0]
      : notes.find((i: { _id: string }) => i._id.startsWith("drafts."));

  return {
    props: {
      note: note,
    },
  };
};

export default Note;
