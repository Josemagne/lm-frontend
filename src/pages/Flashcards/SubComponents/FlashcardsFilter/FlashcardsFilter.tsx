import React, { useEffect } from "react"
import useAppSelector from "../../../../hooks/useAppSelector"
import { RootState } from "../../../../state/redux/store"
import FlashcardsSearch from "./SubComponents/FlashcardsSearch/FlashcardsSearch"

type Props = {}

const FlashcardsFilter = (props: Props) => {
  const flashcards = Object.values(
    useAppSelector((state: RootState) => state.flashcards.flashcards.flashcards)
  )

  useEffect(() => {}, [])

  return (
    <div className="lm-lc-flashcardsfilter">
      <div className="flashcardsfilter__title">
        {/* TODO Remove */}
        <h3>Filter</h3>
      </div>
      <div className="flashcardfilter__search">
        <FlashcardsSearch />
      </div>
    </div>
  )
}

export default FlashcardsFilter
