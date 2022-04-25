type Props = {
  values: any;
};

const BookProgress = ({ values }: Props) => {
  return (
    <div className="lm-bookprogress">
      <input {...values} type="number" name="progress" max={100} min={0} />
    </div>
  );
};

export default BookProgress;
