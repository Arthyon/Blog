import { IRichText } from "./IRichText";

export interface INote {
  _id: string;
  title: string;
  slug: { current: string };
}

export interface INoteDetails extends INote {
  body: IRichText;
}
