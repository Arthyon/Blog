import { FC } from "react";

export interface IDateProps {
  dateString: string;
}

const DisplayDate: FC<IDateProps> = ({ dateString }) => {
  const date = new Date(dateString);

  return (
    <time>
      {date.toLocaleDateString("nb-NO", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })}
    </time>
  );
};

export default DisplayDate;
