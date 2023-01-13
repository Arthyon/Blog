import { IColor } from "Models/IColor";
import { FC } from "react";

export interface ICategoryLabelProps {
  title: string;
  color: IColor;
}

const CategoryLabel: FC<ICategoryLabelProps> = ({ title, color }) => {
  let style = { "text-decoration-color": color.hex } as any;

  return (
    <p className="underline" style={style}>
      {title}
    </p>
  );
};

export default CategoryLabel;
