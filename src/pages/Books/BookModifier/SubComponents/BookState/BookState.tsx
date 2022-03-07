import { useState, ChangeEvent, FormEvent } from "react";
import { Toggle } from "rsuite";

const options = [
  {
    id: true,
    text: "true",
  },
  {
    id: false,
    text: "false",
  },
];

type Props = {
  values: any;
  setFieldValue: any;
};

// TODO Move to components/
const BookState = ({ values, setFieldValue }: Props) => {
  /* STATE */
  const [state, setState] = useState(values.value);

  /* METHODS */

  console.log(values);

  values.value = () => {
    return options.find(({ id }) => id === values.value).text;
  };

  console.log(values);

  values.onChange = (e: FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value) {
      const res = options.find(({ text }) => {
        return text === e.currentTarget.value;
      });

      setFieldValue("read", res.id);
    }
  };

  return (
    <div className="lm-bookstate">
      <Toggle
        style={{ borderRadius: "0 !important" }}
        checked={state}
        checkedChildren="read"
        onChange={() => {
          console.log(values);
        }}
        name="read"
        {...values}
      />
    </div>
  );
};

export default BookState;
