import React from "react"
import BookSelector from "../../components/BookSelector/BookSelector"

// @ts-ignore
import "./characterpage.scss"
import useAppSelector from "../../hooks/useAppSelector"
import { isSelectingBookSelector } from "../../state/redux/features/bookSlice"
import CharacterPagination from "./SubComponents/CharacterPagination/CharacterPagination"
import useAppDispatch from "../../hooks/useAppDispatch"
import { toggleIsAddingNewCharacter } from "../../state/redux/features/characterSlice"
import { isCreatingNewCharacterSelector } from "../../state/redux/selectors/characterSelectors"
import CharacterAdder from "./SubComponents/CharacterAdder/CharacterAdder"

const CharacterPage = () => {
  const dispatch = useAppDispatch()

  const isSelectingBook = useAppSelector(isSelectingBookSelector)
  const isCreatingNewCharacter = useAppSelector(isCreatingNewCharacterSelector)

  const openCharacterAdder = () => {
    dispatch(toggleIsAddingNewCharacter(""))
  }

  return (
    <div className="lm-page lm-character">
      <BookSelector />
      {isSelectingBook && <CharacterPagination />}
      {isSelectingBook && (
        <button className="btn btn-primary" onClick={openCharacterAdder}>
          Add Character
        </button>
      )}
      {isCreatingNewCharacter && <CharacterAdder />}
    </div>
  )
}

export default CharacterPage
