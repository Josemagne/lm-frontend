import userAppSelector from "../../hooks/useAppSelector"
import userAppDispatch from "../../hooks/useAppDispatch"
import {LM_EntityName} from "../../types/Entity/entity"

interface Props {
  type: LM_EntityName;
}

export default function SummaryAdder({type}: Props) {


  return (
    <div className="lm-gc-summaryadder">
    </div>

  )
}
