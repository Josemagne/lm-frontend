import React from "react";
import { useMemo } from "react";
import { withReact } from "slate-react";
import { createEditor } from "slate";
import { useFormik } from "formik";

type Props = {};

const AddBook = (props: Props) => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const formik = useFormik({
    initialValues: {},
    onSubmit: (values, { resetForm }) => {
      resetForm();
    },
  });
  return <div className="lm-addbook"></div>;
};

export default AddBook;
