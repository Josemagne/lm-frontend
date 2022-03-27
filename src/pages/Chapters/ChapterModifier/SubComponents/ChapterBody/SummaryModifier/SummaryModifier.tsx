import { useMemo, useState, useEffect } from "react";
import { createEditor, Descendant } from "slate";
import { Editable, withReact, Slate } from "slate-react";
import TextContainer from "../../../../../../components/TextContainer/TextContainer";
import useAppDispatch from "../../../../../../hooks/useAppDispatch";
import LM_Chapter from "../../../../../../types/Book/chapter";
import useAppSelector from "../../../../../../../build/hooks/useAppSelector";

type Props = {
  content?: Descendant[];
  changeHandler?: (newEntity: any) => void;
  /**
   * The entity whose summary we are handling
   */
};

/**
 * Summaries an entity such as a book or a chapter
 * @param props
 * @returns
 */
const SummaryModifier = ({ changeHandler, content }: Props) => {
  const dispatch = useAppDispatch();

  const summary = useAppSelector(
    (state) => (state.books.selectedChapter as LM_Chapter).summary
  );

  useEffect(() => {}, [summary]);

  useEffect(() => {}, []);

  return (
    <div className="lm-summarymodifier">
      {summary ? (
        <TextContainer
          content={summary}
          // values={formik.getFieldProps("subchapters")}
          name={"summarymodifier"}
        />
      ) : (
        <TextContainer
          content={summary}
          // values={formik.getFieldProps("subchapters")}
          name={"summarymodifier"}
        />
      )}
    </div>
  );
};

export default SummaryModifier;
