import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { IRichText } from "./IRichText";

export interface IPost {
  _id: string;
  title: string;
  leadParagraph: string;
  publishedAt: string;
  slug: { current: string };
}

export interface IPostDetails extends IPost {
  body: IRichText;
  mainImage: SanityImageSource;
}
