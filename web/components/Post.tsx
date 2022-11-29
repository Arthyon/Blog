import { IPost } from "Models/IPost";
import Link from "next/link";
import { FC } from "react";

interface IPostProps {
  post: IPost;
}

const Post: FC<IPostProps> = ({ post }) => {
  return (
    <Link
      href={`/post/${post.slug.current}`}
      className="m-6 flex flex-col items-center border rounded-lg shadow-md md:flex-row md:max-w-xl  border-gray-700 bg-gray-800 hover:bg-gray-700"
    >
      <div className="flex flex-col justify-between p-4 leading-normal flex-1">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {post.title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {post.leadParagraph}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {new Date(post.publishedAt).toLocaleDateString("nb-NO")}
        </p>
      </div>
    </Link>
  );
};

export default Post;
