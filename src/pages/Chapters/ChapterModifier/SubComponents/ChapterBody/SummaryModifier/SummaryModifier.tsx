import { useMemo, useState } from "react";
import { createEditor, Descendant } from "slate";
import { Editable, withReact, Slate } from "slate-react";
import TextContainer from "../../../../../../components/TextContainer/TextContainer";
import useAppDispatch from "../../../../../../hooks/useAppDispatch";

type Props = {};

const SummaryModifier = (props: Props) => {
  const initialValue: Descendant[] = [
    {
      children: [{ text: "Type in here your summary." }],
    },
  ];
  const [value, setValue] = useState<Descendant[]>(initialValue);
  // @ts-ignore
  const editor = useMemo(() => withReact(createEditor()), []);

  const changeHandler = () => {};

  const submitHandler = () => {
    useAppDispatch();
  };

  return (
    <div className="lm-summarymodifier">
      <TextContainer content={[{ text: "summary" }]} />
    </div>
  );
};

export default SummaryModifier;
