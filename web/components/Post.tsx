import { IPost } from "Models/IPost";
import Link from "next/link";
import { FC } from "react";
import DisplayDate from "./DisplayDate";

interface IPostProps {
  post: IPost;
}

const Post: FC<IPostProps> = ({ post }) => {
  return (
    <div className="mb-2">
      <Link href={`/post/${post.slug.current}`}>
        <div className="flex flex-col justify-between p-4 leading-normal flex-1">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
            {post.title}
          </h5>
          <p className="mb-3 font-normal text-gray-600">
            <DisplayDate dateString={post.publishedAt} />
          </p>
          <p className="mb-3 font-normal text-gray-400">{post.leadParagraph}</p>
        </div>
      </Link>
    </div>
  );
};

export default Post;
