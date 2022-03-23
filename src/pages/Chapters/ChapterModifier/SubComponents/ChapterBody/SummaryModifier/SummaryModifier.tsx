import { useMemo, useState } from "react";
import { createEditor, Descendant } from "slate";
import { Editable, withReact, Slate } from "slate-react";
import TextContainer from "../../../../../../components/TextContainer/TextContainer";
import useAppDispatch from "../../../../../../hooks/useAppDispatch";

type Props = {
  content?: Descendant[];
};

const SummaryModifier = (props: Props) => {
  // @ts-ignore

  return (
    <div className="lm-summarymodifier">
      <TextContainer
        content={[{ children: [{ text: "ubchapter" }] }]}
        // values={formik.getFieldProps("subchapters")}
        name={"subchapters"}
      />
    </div>
  );
};

export default SummaryModifier;
