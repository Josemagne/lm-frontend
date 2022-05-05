import { render, screen } from "@testing-library/react"
import ChapterModal from "./ChapterModal"
import { changeSelectedChapter } from "../../../state/redux/features/chapterSlice"
import Chapter from "../../../classes/Chapter"
import { nanoid } from "nanoid"
import useAppDispatch from "../../../hooks/useAppDispatch"
describe("ChapterModal", () => {
  it("Should show on the page when we selectedChapter is not null", () => {
    const dispatch = useAppDispatch()

    dispatch(
      changeSelectedChapter(
        new Chapter(nanoid(), nanoid(), "", "TO_READ", 0, "", "1")
      )
    )

    render(<ChapterModal />)
  })
})
