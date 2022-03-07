type Props = {};

const BookPages = ({}: Props) => {
  return (
    <div className="lm-bookpages">
      <input
        type="number"
        className="lm-bookpages__input"
        // NOTE formik needs the name in order to appropriately change formik.values
        name="pages"
      />
    </div>
  );
};

export default BookPages;
