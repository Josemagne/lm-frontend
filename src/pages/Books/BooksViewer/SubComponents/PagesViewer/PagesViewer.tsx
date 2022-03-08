type Props = {
  pages: number;
};

const PagesViewer = ({ pages }: Props) => {
  return <div className="lm-pagesviewer">pages: {pages}</div>;
};

export default PagesViewer;
