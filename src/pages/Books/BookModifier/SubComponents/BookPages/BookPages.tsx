import { formik } from "../../../../../state/redux/features/bookSlice";

type Props = {};

const BookPages = (props: Props) => {
  return (
    <div className="lm-bookpages">
      <input
        type="number"
        className="lm-bookpages__input"
        // NOTE formik needs the name in order to appropriately change formik.values
        name="pages"
        value={formik.values.pages}
        onChange={(e) => {
          formik.handleChange(e);
        }}
      />
    </div>
  );
};

export default BookPages;
