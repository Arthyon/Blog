import Refractor from "react-refractor";
import ts from "refractor/lang/typescript";
import cs from "refractor/lang/csharp";
import fs from "refractor/lang/fsharp";
import rust from "refractor/lang/rust";
import json from "refractor/lang/json";
import { FC } from "react";

Refractor.registerLanguage(ts);
Refractor.registerLanguage(cs);
Refractor.registerLanguage(fs);
Refractor.registerLanguage(rust);
Refractor.registerLanguage(json);

export interface ICodeViewProps {
  code: string;
  language: string;
  inline?: boolean;
}

const CodeView: FC<ICodeViewProps> = ({
  code,
  language = "csharp",
  inline = false,
}) => {
  return <Refractor language={language} value={code} inline={inline} />;
};

export default CodeView;
