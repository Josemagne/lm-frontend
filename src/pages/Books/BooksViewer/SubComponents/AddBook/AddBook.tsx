import React from "react";
import { useMemo } from "react";
import { useFormik } from "formik";

type Props = {};

const AddBook = (props: Props) => {
  // @ts-ignore
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
