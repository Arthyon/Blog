import { PortableText } from "@portabletext/react";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import { FC } from "react";
import client from "../client";
import CodeView from "./CodeView";

interface IRichTextProps {
  body: [];
}

const RichText: FC<IRichTextProps> = ({ body }) => {
  return <PortableText value={body} components={ptComponents} />;
};

function urlFor(source: SanityImageSource) {
  return imageUrlBuilder(client).image(source);
}

const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return <></>;
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
    code: ({ value }: any) => {
      return <CodeView code={value.code} language={value.language} />;
    },
  },
};

export default RichText;
