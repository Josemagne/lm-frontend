import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import App from "./App"
import { store } from "./state/redux/store"
import { HashRouter } from "react-router-dom"

describe("App", () => {
  beforeEach(() => {
    render(
      <HashRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </HashRouter>
    )
  })
  it("Should display the Home page on first render", () => {})

  it("Should show the login and register button if the user is not logged in", () => {})

  it("", () => {})
})
