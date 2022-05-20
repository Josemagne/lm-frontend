import { mount } from "@cypress/react"
import { Provider } from "react-redux"
import { HashRouter } from "react-router-dom"
import { store } from "../../../state/redux/store"
import ChaptersViewer from "./ChaptersViewer"

describe("ChaptersViewer", () => {
  beforeEach(() => {
    mount(
      <Provider store={store}>
        <HashRouter>
          <ChaptersViewer />
        </HashRouter>
      </Provider>
    )
  })
})
