import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import { HashRouter } from "react-router-dom"
import { store } from "../state/redux/store"

export const renderReactElement = (ReactElement: JSX.Element, props: any) => {
  return render(
    <Provider store={store}>
      <HashRouter>
        <ReactElement {...props} />
      </HashRouter>
    </Provider>
  )
}
