import React, { useEffect } from "react"
import { Drawer } from "@mui/material"
import useAppSelector from "../../../../hooks/useAppSelector"
import { isCreatingNewCharacterSelector } from "../../../../state/redux/selectors/characterSelectors"
import useAppDispatch from "../../../../hooks/useAppDispatch"
import { toggleIsAddingNewCharacter } from "../../../../state/redux/features/characterSlice"

const CharacterAdder = () => {
  const dispatch = useAppDispatch()
  const isCreatingNewCharacter = useAppSelector(isCreatingNewCharacterSelector)

  const handleClose = () => {
    dispatch(toggleIsAddingNewCharacter(""))
  }

  useEffect(() => {}, [isCreatingNewCharacter])

  return (
    <div className="character__characteradder">
      <Drawer
        open={isCreatingNewCharacter}
        anchor="right"
        onClose={handleClose}
      >
        <p>New character</p>
      </Drawer>
    </div>
  )
}

export default CharacterAdder
