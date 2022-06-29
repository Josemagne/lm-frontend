import { mount } from "@cypress/react"
import NoteModal from "./NoteModal"
import { Provider } from "react-redux"
import { store } from "../../../../../state/redux/store"
import { HashRouter } from "react-router-dom"
import { changeSelectedBook } from "../../../../../state/redux/features/bookSlice"
import Book from "../../../../../classes/Book"
import {
  changeSelectedNote,
  toggleIsSelectingNote,
} from "../../../../../state/redux/features/noteSlice"
import Note from "../../../../../classes/Note"

describe("NoteModal", () => {
  beforeEach(() => {
    store.dispatch(toggleIsSelectingNote(""))
    store.dispatch(changeSelectedNote(new Note("", "lkasfd", "BOOK", "jlkasf")))
    mount(
      <Provider store={store}>
        <HashRouter>
          <NoteModal />
        </HashRouter>
      </Provider>
    )
  })

  it("Should display the ", () => {
    cy.get("[data-testid=notemodal]").should("exist")
  })
})
