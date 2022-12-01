import { FC } from "react";

interface IPostProps {
  title: string;
}

const Post: FC<IPostProps> = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

export default Post;
