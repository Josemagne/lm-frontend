type Props = {
  values: any;
};

const BookPages = ({ values }: Props) => {
  return (
    <div className="lm-bookpages">
      <input
        type="number"
        className="lm-bookpages__input"
        // NOTE formik needs the name in order to appropriately change formik.values
        name="pages"
        {...values}
      />
    </div>
  );
};

export default BookPages;
