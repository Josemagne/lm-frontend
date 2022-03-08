type Props = {
  pages: number;
};

const PagesViewer = ({ pages }: Props) => {
  return <div className="lm-pagesviewer">{pages}</div>;
};

export default PagesViewer;
