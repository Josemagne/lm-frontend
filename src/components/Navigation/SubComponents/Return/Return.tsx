import { useNavigate } from "react-router";

type Props = {};

const Return = ({}: Props) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(-1);
  };

  return (
    <div className="lm-navigation__return" onClick={clickHandler}>
      <p>{"<"}</p>
    </div>
  );
};

export default Return;
